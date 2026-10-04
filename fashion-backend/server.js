const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Aiven MySQL Connection Pool
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running successfully!' });
});

// API test route
app.get('/api/test', (req, res) => {
  res.json({ status: 'success', message: 'API routes are working!' });
});

// Database connection test route
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ success: true, message: 'Database connected successfully!', result: rows[0].result });
  } catch (error) {
    console.error('DB Test Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Database connection test route
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ success: true, message: 'Database connected successfully!', result: rows[0].result });
  } catch (error) {
    console.error('DB Test Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Database auto-initialize route
// Database auto-initialize route (Products & Orders Schema Setup)
app.get('/api/init-db', async (req, res) => {
  try {
    // 1. Create products table with category
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) DEFAULT 'men',
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add category column if products table existed earlier without it
    try {
      await pool.query(`ALTER TABLE products ADD COLUMN category VARCHAR(100) DEFAULT 'men'`);
    } catch (e) {
      // Column might already exist, ignore error
    }

    // 2. Clear old test products and seed catalog
    await pool.query('DELETE FROM products');
    await pool.query(`
      INSERT INTO products (title, slug, price, category, description, image_url) VALUES
      ('Premium Cotton Panjabi', 'premium-cotton-panjabi', 2500.00, 'men', 'Exclusive cotton collection tailored to perfection.', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500'),
      ('Classic Linen Shirt', 'classic-linen-shirt', 1800.00, 'men', 'Pure linen casual shirt designed for comfort.', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'),
      ('Haute Couture Silk Dress', 'haute-couture-silk-dress', 3500.00, 'women', 'Sculpted hourglass tailoring and pure silk drapery.', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500'),
      ('Kids Loopback Fleece', 'kids-loopback-fleece', 1200.00, 'kids', 'Ultra-soft organic daily staple fleece.', 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500')
    `);

    // 3. Create orders table for Checkout & Tracking
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255),
        customer_phone VARCHAR(50) NOT NULL,
        customer_address TEXT NOT NULL,
        city VARCHAR(100),
        postal_code VARCHAR(50),
        total_price DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'cod',
        items_json LONGTEXT,
        order_status VARCHAR(50) DEFAULT 'processing',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure all order columns exist if table was partially created
    const alterQueries = [
      `ALTER TABLE orders ADD COLUMN customer_email VARCHAR(255)`,
      `ALTER TABLE orders ADD COLUMN city VARCHAR(100)`,
      `ALTER TABLE orders ADD COLUMN postal_code VARCHAR(50)`,
      `ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50) DEFAULT 'cod'`,
      `ALTER TABLE orders ADD COLUMN items_json LONGTEXT`,
      `ALTER TABLE orders ADD COLUMN order_status VARCHAR(50) DEFAULT 'processing'`
    ];

    for (const q of alterQueries) {
      try { await pool.query(q); } catch (e) { /* column exists */ }
    }

    res.json({ success: true, message: 'Database initialized: Products catalog and Orders table ready!' });
  } catch (error) {
    console.error('Init DB Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Live Products Route from Aiven MySQL
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch products error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


// Create a new product (POST /api/products)
app.post('/api/products', async (req, res) => {
  try {
    const { title, slug, price, category, description, image_url } = req.body;

    if (!title || !slug || !price) {
      return res.status(400).json({ success: false, message: 'Title, slug, and price are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO products (title, slug, price, category, description, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        Number(price),
        (category || 'men').toLowerCase(),
        description || '',
        image_url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'
      ]
    );

    res.status(201).json({
      success: true,
      productId: result.insertId,
      message: 'Product published to database successfully!'
    });
  } catch (error) {
    console.error('Create product error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== ORDERS API ==================== //

// 1. Create New Order (POST /api/orders)
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      city,
      postal_code,
      total_price,
      payment_method,
      items
    } = req.body;

    if (!customer_name || !customer_phone || !customer_address || !total_price) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const itemsSummary = JSON.stringify(items || []);

    const [result] = await pool.query(
      `INSERT INTO orders 
      (customer_name, customer_email, customer_phone, customer_address, city, postal_code, total_price, payment_method, items_json, order_status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'processing')`,
      [
        customer_name,
        customer_email || '',
        customer_phone,
        customer_address,
        city || '',
        postal_code || '',
        total_price,
        payment_method || 'cod',
        itemsSummary
      ]
    );

    res.status(201).json({
      success: true,
      orderId: result.insertId,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Order creation error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Track Order by ID (GET /api/orders/:id)
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const order = rows[0];
    let parsedItems = [];
    try {
      parsedItems = JSON.parse(order.items_json || '[]');
    } catch (e) {
      parsedItems = [];
    }

    res.json({
      success: true,
      order: {
        id: order.id,
        order_status: order.order_status,
        customer_name: order.customer_name,
        shipping_address: order.customer_address,
        city: order.city,
        postal_code: order.postal_code,
        total_amount: Number(order.total_price).toFixed(2),
        payment_method: order.payment_method,
        items: parsedItems,
        created_at: order.created_at
      }
    });
  } catch (error) {
    console.error('Order tracking error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Get All Orders for Admin (GET /api/orders)
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY id DESC LIMIT 50');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch orders error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Update Order Status from Admin (PUT /api/orders/:id/status)
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE orders SET order_status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update status error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Order placement route
app.post('/api/orders', async (req, res) => {
  try {
    const { customer_name, customer_phone, customer_address, product_id, quantity, total_price } = req.body;
    const [result] = await pool.query(
      'INSERT INTO orders (customer_name, customer_phone, customer_address, product_id, quantity, total_price) VALUES (?, ?, ?, ?, ?, ?)',
      [customer_name, customer_phone, customer_address, product_id, quantity, total_price]
    );
    res.json({ success: true, orderId: result.insertId });
  } catch (error) {
    console.error('Order error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 1. Create a New Order (POST /api/orders)
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      city,
      postal_code,
      total_price,
      payment_method,
      items
    } = req.body;

    if (!customer_name || !customer_phone || !customer_address || !total_price) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const itemsSummary = JSON.stringify(items || []);

    const [result] = await pool.query(
      `INSERT INTO orders 
      (customer_name, customer_email, customer_phone, customer_address, city, postal_code, total_price, payment_method, items_json, order_status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'processing')`,
      [
        customer_name,
        customer_email || '',
        customer_phone,
        customer_address,
        city || '',
        postal_code || '',
        total_price,
        payment_method || 'cod',
        itemsSummary
      ]
    );

    res.status(201).json({
      success: true,
      orderId: result.insertId,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Order creation error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Track an Order by ID (GET /api/orders/:id)
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const order = rows[0];
    let parsedItems = [];
    try {
      parsedItems = JSON.parse(order.items_json || '[]');
    } catch (e) {
      parsedItems = [];
    }

    res.json({
      success: true,
      order: {
        id: order.id,
        order_status: order.order_status,
        customer_name: order.customer_name,
        shipping_address: order.customer_address,
        city: order.city,
        postal_code: order.postal_code,
        total_amount: Number(order.total_price).toFixed(2),
        payment_method: order.payment_method,
        items: parsedItems,
        created_at: order.created_at
      }
    });
  } catch (error) {
    console.error('Order tracking error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Get All Orders for Admin (GET /api/orders)
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY id DESC LIMIT 50');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch orders error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Update Order Status (PUT /api/orders/:id/status)
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE orders SET order_status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update status error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
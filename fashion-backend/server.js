const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Aiven MySQL Database Connection Pool (Støtter DATABASE_URL eller separate variabler)
const poolConfig = process.env.DATABASE_URL
  ? {
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }
  : {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 18054,
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };

const pool = mysql.createPool(poolConfig);

// Testrute for databasetilkobling
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ success: true, message: 'Database connected successfully!', solution: rows[0].solution });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      code: error.code,
      allErrors: error.errors ? error.errors.map(e => e.message) : []
    });
  }
});

// Databaseinitialisering (oppretter tabeller dersom de ikke eksisterer)
app.get('/api/init-db', async (req, res) => {
  try {
    // 1. Tabell for produkter
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        price DECIMAL(10, 2) NOT NULL,
        stock INT DEFAULT 10,
        category VARCHAR(100) DEFAULT 'men',
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Tabell for ordrer
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

    // 3. Tabell for anmeldelser
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reviewer_name VARCHAR(255) NOT NULL,
        rating INT NOT NULL DEFAULT 5,
        fit_feedback VARCHAR(100) DEFAULT 'True to Size',
        review_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    res.json({
      success: true,
      message: 'Database initialized: Products, Orders, and Reviews tables ready!'
    });
  } catch (error) {
    console.error('Init DB Detailed Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || String(error)
    });
  }
});

// ==================== PRODUKT-API ==================== //

// 1. Hent alle produkter (GET /api/products)
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch products error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Opprett et nytt produkt (POST /api/products)
app.post('/api/products', async (req, res) => {
  try {
    const { title, slug, price, stock, category, description, image_url } = req.body;

    if (!title || !slug || !price) {
      return res.status(400).json({ success: false, message: 'Title, slug, and price are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO products (title, slug, price, stock, category, description, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        Number(price),
        stock !== undefined ? Number(stock) : 10,
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

// 3. Oppdater pris og lager for et produkt (PUT /api/products/:id)
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { price, stock } = req.body;

    const [result] = await pool.query(
      'UPDATE products SET price = COALESCE(?, price), stock = COALESCE(?, stock) WHERE id = ?',
      [price !== undefined ? Number(price) : null, stock !== undefined ? Number(stock) : null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({ success: true, message: `Product #${id} updated successfully!` });
  } catch (error) {
    console.error('Update product error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Slett et produkt permanent (DELETE /api/products/:id)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted from database successfully!' });
  } catch (error) {
    console.error('Delete product error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== ORDRE-API ==================== //

// 1. Opprett en ny ordre (POST /api/orders)
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

// 2. Spor en ordre via ID (GET /api/orders/:id)
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

// 3. Hent alle ordrer til administrasjonspanelet (GET /api/orders)
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY id DESC LIMIT 50');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch orders error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Oppdater ordrestatus fra administrasjonspanelet (PUT /api/orders/:id/status)
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { order_status, status } = req.body;
    const updatedStatus = order_status || status;

    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(updatedStatus)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Allowed: processing, shipped, delivered, cancelled' 
      });
    }

    const [result] = await pool.query('UPDATE orders SET order_status = ? WHERE id = ?', [updatedStatus, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: `Order #${id} status updated to ${updatedStatus} successfully!` });
  } catch (error) {
    console.error('Update status error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== ANMELDELSER-API ==================== //

// 1. Hent alle anmeldelser (GET /api/reviews)
app.get('/api/reviews', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reviews ORDER BY id DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch reviews error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Publiser en ny anmeldelse (POST /api/reviews)
app.post('/api/reviews', async (req, res) => {
  try {
    const { reviewer_name, rating, fit_feedback, review_text } = req.body;
    if (!reviewer_name || !review_text) {
      return res.status(400).json({ success: false, message: 'Reviewer name and review text are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO reviews (reviewer_name, rating, fit_feedback, review_text) VALUES (?, ?, ?, ?)`,
      [reviewer_name, Number(rating) || 5, fit_feedback || 'True to Size', review_text]
    );

    res.status(201).json({
      success: true,
      reviewId: result.insertId,
      message: 'Review submitted successfully!'
    });
  } catch (error) {
    console.error('Submit review error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Express-server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
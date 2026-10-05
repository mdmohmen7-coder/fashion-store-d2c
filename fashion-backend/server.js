const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Aiven MySQL Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 18054,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/// Health check / DB Test Route with deep error inspector
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

// Database auto-initialize route
app.get('/api/init-db', async (req, res) => {
  try {
    // 1. Ensure Products Table
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

    // 2. Ensure Orders Table
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

    // 3. Ensure Reviews Table
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


// 2. Create a new product (POST /api/products)
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

// ==================== REVIEWS API ==================== //

// 1. Get All Reviews (GET /api/reviews)
app.get('/api/reviews', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reviews ORDER BY id DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch reviews error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Submit a New Review (POST /api/reviews)
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

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
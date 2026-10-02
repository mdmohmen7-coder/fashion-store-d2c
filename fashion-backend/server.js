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
app.get('/api/init-db', async (req, res) => {
  try {
    // 1. Create products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_address TEXT NOT NULL,
        product_id INT,
        quantity INT DEFAULT 1,
        total_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Insert sample products if empty
    const [existing] = await pool.query('SELECT COUNT(*) AS count FROM products');
    if (existing[0].count === 0) {
      await pool.query(`
        INSERT INTO products (title, slug, price, description, image_url) VALUES
        ('Premium Panjabi', 'premium-panjabi', 2500.00, 'Exclusive cotton collection', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500'),
        ('Casual Shirt', 'casual-shirt', 1500.00, '100% pure linen casual shirt', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500')
      `);
    }

    res.json({ success: true, message: 'Database tables and initial products created successfully!' });
  } catch (error) {
    console.error('Init DB Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


// Live Products Route from Aiven MySQL
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Fetch products error:', error.message);
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

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
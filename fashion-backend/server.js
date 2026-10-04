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

    // Add category column if it was created earlier without it
    try {
      await pool.query(`ALTER TABLE products ADD COLUMN category VARCHAR(100) DEFAULT 'men'`);
    } catch (e) {
      // Column might already exist, ignore error
    }

    // 2. Clear old test products and add complete ones
    await pool.query('DELETE FROM products');
    await pool.query(`
      INSERT INTO products (title, slug, price, category, description, image_url) VALUES
      ('Premium Cotton Panjabi', 'premium-cotton-panjabi', 2500.00, 'men', 'Exclusive cotton collection tailored to perfection.', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500'),
      ('Classic Linen Shirt', 'classic-linen-shirt', 1800.00, 'men', 'Pure linen casual shirt designed for comfort.', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'),
      ('Haute Couture Silk Dress', 'haute-couture-silk-dress', 3500.00, 'women', 'Sculpted hourglass tailoring and pure silk drapery.', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500'),
      ('Kids Loopback Fleece', 'kids-loopback-fleece', 1200.00, 'kids', 'Ultra-soft organic daily staple fleece.', 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500')
    `);

    res.json({ success: true, message: 'Products with categories inserted successfully!' });
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
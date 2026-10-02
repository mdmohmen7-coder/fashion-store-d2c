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
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.send('Server is live and running!');
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working fine!' });
});

// Get all products route
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single product by slug route
app.get('/api/products/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await db.query('SELECT * FROM products WHERE slug = ?', [slug]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Port and host binding for Render cloud deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
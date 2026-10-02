const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running successfully!' });
});

// API test route
app.get('/api/test', (req, res) => {
  res.json({ status: 'success', message: 'API routes are working!' });
});

// Temporary sample products route (Database connection add korar age verify korar jonno)
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        title: 'Premium Panjabi',
        slug: 'premium-panjabi',
        price: 2500,
        description: 'Exclusive collection'
      }
    ]
  });
});

// Render host & port binding (0.0.0.0 is mandatory for Render)
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
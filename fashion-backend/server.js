require('dotenv').config();
const express = require('express');
const stripe = require('stripe')('sk_test_51MzDemoKeyReplaceWithYoursOrKeepForSimulatedFlow000');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Test route to verify server is reachable
app.get('/', (req, res) => {
  res.send('Server is live and running!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working fine!' });
});

// 0. Get All Products (Storefront Collection)
app.get('/api/products', async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT p.*, c.name AS category_name,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS thumbnail_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id ASC
    `);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 1. Get Product by Slug (With variants and images)
app.get('/api/products/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const [products] = await pool.query(
      `SELECT p.*, c.name AS category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.slug = ?`, 
      [slug]
    );

    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const product = products[0];

    const [variants] = await pool.query(
      `SELECT pv.id, pv.sku, pv.stock_quantity,
              cl.id AS color_id, cl.name AS color_name, cl.hex_code,
              sz.id AS size_id, sz.name AS size_name
       FROM product_variants pv
       LEFT JOIN colors cl ON pv.color_id = cl.id
       LEFT JOIN sizes sz ON pv.size_id = sz.id
       WHERE pv.product_id = ?`,
      [product.id]
    );

    const [images] = await pool.query(
      `SELECT id, color_id, image_url, is_primary 
       FROM product_images 
       WHERE product_id = ?`,
      [product.id]
    );

    res.json({
      success: true,
      data: {
        ...product,
        variants,
        images
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Place Order & Auto Deduct Stock API
app.post('/api/orders', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { customer, items, totalAmount } = req.body;

    const [orderResult] = await connection.query(
      `INSERT INTO orders 
        (customer_name, customer_email, customer_phone, shipping_address, city, postal_code, total_amount) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        customer.name, 
        customer.email, 
        customer.phone, 
        customer.address, 
        customer.city, 
        customer.postalCode, 
        totalAmount
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items 
          (order_id, variant_id, product_name, color_name, size_name, quantity, unit_price) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.variantId,
          item.title,
          item.color,
          item.size,
          item.quantity,
          item.price
        ]
      );

      await connection.query(
        `UPDATE product_variants 
         SET stock_quantity = stock_quantity - ? 
         WHERE id = ? AND stock_quantity >= ?`,
        [item.quantity, item.variantId, item.quantity]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId
    });
  } catch (error) {
    await connection.rollback();
    console.error('Order placement failed:', error);
    res.status(500).json({ success: false, message: 'Failed to process order' });
  } finally {
    connection.release();
  }
});

// 3. Admin: Get All Orders API
app.get('/api/admin/orders', async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT * FROM orders ORDER BY created_at DESC`
    );
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 4. Admin: Update Order Status API
app.patch('/api/admin/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE orders SET order_status = ? WHERE id = ?', [status, id]);
    res.json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 5. Admin: Update Variant Stock Inventory API
app.patch('/api/admin/variants/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    await pool.query('UPDATE product_variants SET stock_quantity = ? WHERE id = ?', [stock, id]);
    res.json({ success: true, message: 'Stock updated successfully' });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 6. Admin: Add New Product API
app.post('/api/admin/products', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { category_id, title, slug, description, base_price, image_url, stock_s, stock_m, stock_l } = req.body;

    const [prodResult] = await connection.query(
      `INSERT INTO products (category_id, title, slug, description, base_price) 
       VALUES (?, ?, ?, ?, ?)`,
      [category_id, title, slug, description, base_price]
    );
    const newProductId = prodResult.insertId;

    await connection.query(
      `INSERT INTO product_images (product_id, color_id, image_url, is_primary) 
       VALUES (?, 1, ?, 1)`,
      [newProductId, image_url]
    );

    const variants = [
      { size_id: 1, sku: `${slug.substring(0, 4).toUpperCase()}-BLK-S`, stock: stock_s || 10 },
      { size_id: 2, sku: `${slug.substring(0, 4).toUpperCase()}-BLK-M`, stock: stock_m || 15 },
      { size_id: 3, sku: `${slug.substring(0, 4).toUpperCase()}-BLK-L`, stock: stock_l || 10 }
    ];

    for (const v of variants) {
      await connection.query(
        `INSERT INTO product_variants (product_id, color_id, size_id, sku, stock_quantity) 
         VALUES (?, 1, ?, ?, ?)`,
        [newProductId, v.size_id, v.sku, v.stock]
      );
    }

    await connection.commit();
    res.status(201).json({ success: true, message: 'Product created successfully', productId: newProductId });
  } catch (error) {
    await connection.rollback();
    console.error('Failed to create product:', error);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  } finally {
    connection.release();
  }
});

// 7. Get Reviews for a Product
app.get('/api/products/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const [reviews] = await pool.query(
      `SELECT * FROM product_reviews WHERE product_id = ? ORDER BY created_at DESC`,
      [id]
    );
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 8. Post a New Product Review
app.post('/api/products/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewer_name, rating, fit_feedback, review_text } = req.body;

    const [result] = await pool.query(
      `INSERT INTO product_reviews (product_id, reviewer_name, rating, fit_feedback, review_text) 
       VALUES (?, ?, ?, ?, ?)`,
      [id, reviewer_name, rating, fit_feedback, review_text]
    );

    res.status(201).json({ success: true, message: 'Review added', reviewId: result.insertId });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ success: false, message: 'Failed to submit review' });
  }
});

// 9. Validate Promo Coupon API
app.post('/api/coupons/validate', async (req, res) => {
  try {
    const { code } = req.body;
    const [rows] = await pool.query(
      `SELECT * FROM promo_coupons WHERE UPPER(code) = UPPER(?) AND is_active = 1`,
      [code]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Invalid or expired promo code.' });
    }

    res.json({
      success: true,
      code: rows[0].code,
      discount_percentage: rows[0].discount_percentage
    });
  } catch (error) {
    console.error('Coupon validation error:', error);
    res.status(500).json({ success: false, message: 'Server error validating code.' });
  }
});

// 10. Track / Lookup Order by ID
app.get('/api/orders/track/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [orders] = await pool.query(`SELECT * FROM orders WHERE id = ?`, [id]);

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: 'No order found with this ID.' });
    }

    const order = orders[0];
    const [items] = await pool.query(`SELECT * FROM order_items WHERE order_id = ?`, [id]);

    res.json({
      success: true,
      data: {
        ...order,
        items
      }
    });
  } catch (error) {
    console.error('Error tracking order:', error);
    res.status(500).json({ success: false, message: 'Server error looking up order.' });
  }
});

// 11. Stripe Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const amountInCents = Math.round(Number(amount) * 100);

    res.json({
      success: true,
      clientSecret: `pi_test_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
      amount: amountInCents,
      currency: currency || 'usd',
      status: 'requires_payment_method'
    });
  } catch (error) {
    console.error('Stripe intent error:', error);
    res.status(500).json({ success: false, message: 'Failed to initialize payment gateway' });
  }
});

// Global Error Handler
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
/**
 * Main Express Server
 * 
 * Product Review Application demonstrating MongoDB's Flexible Schema
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Import routes
const productRoutes = require('./src/routes/productRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser & CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/products/:productId/reviews', reviewRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Product Review API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html for SPA-style client routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Start Server and optionally attempt MongoDB connection
const startServer = async () => {
  try {
    // Attempt DB connection
    await connectDB();
  } catch (err) {
    console.log('⚠️ Server will start, but MongoDB is not connected yet.');
  }

  app.listen(PORT, () => {
    console.log('========================================================');
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📂 Serving frontend from: ${path.join(__dirname, 'public')}`);
    console.log('========================================================');
  });
};

if (require.main === module) {
  startServer();
}

module.exports = app;

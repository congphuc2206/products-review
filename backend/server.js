/**
 * FlexiReview Pure Backend REST API Server
 */

require('dotenv').config();
const express = require('express');
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

// Request Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  const method = req.method;
  const url = req.originalUrl || req.url;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusColor = status >= 400 ? '❌' : (status >= 300 ? '↩️' : '✅');
    
    if (url.startsWith('/api')) {
      const operationType = method === 'GET' ? '📖 [ĐỌC - Read Replica]' : '✏️ [GHI - Primary Node]';
      console.log(`${statusColor} [${method}] ${url} -> Status: ${status} (${duration}ms) | ${operationType}`);
    }
  });

  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Product Review Backend API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/products/:productId/reviews', reviewRoutes);
app.use('/api/reviews', reviewRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Product Review Backend API',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      reviews: '/api/reviews'
    }
  });
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

// Start Server and connect MongoDB
const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.log('⚠️ Server will start, but MongoDB is not connected yet.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log('========================================================');
    console.log(`🚀 Pure Backend API running at http://0.0.0.0:${PORT}`);
    console.log(`🏥 Health check at: http://0.0.0.0:${PORT}/api/health`);
    console.log('========================================================');
  });
};

startServer();

module.exports = app;

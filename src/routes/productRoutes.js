/**
 * Product Routes (CRUD + Search & Filtering)
 */

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');

/**
 * @route   GET /api/products
 * @desc    Get all products with optional filtering (category, search keyword, sorting)
 */
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, minRating } = req.query;
    
    // Build flexible query object
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      // Search across name, description, tags, or category using regex
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    if (minRating) {
      filter.averageRating = { $gte: Number(minRating) };
    }

    // Build sort options
    let sortOptions = { createdAt: -1 }; // Default newest first
    if (sort === 'rating_desc') sortOptions = { averageRating: -1, reviewCount: -1 };
    if (sort === 'rating_asc') sortOptions = { averageRating: 1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };
    if (sort === 'name_asc') sortOptions = { name: 1 };

    const products = await Product.find(filter).sort(sortOptions);
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('❌ [API Error GET /api/products]:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error fetching products',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/products/meta/categories
 * @desc    Get all unique categories and sample specification templates
 */
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching categories',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID with its reviews
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Fetch all reviews for this product
    const reviews = await Review.find({ productId: req.params.id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        ...product.toObject(),
        reviews
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching product details',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product (demonstrating flexible schema with dynamic specs)
 */
router.post('/', async (req, res) => {
  try {
    const { name, category, price, description, imageUrl, specifications, tags } = req.body;

    if (!name || !category || price === undefined || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, category, price, and description'
      });
    }

    const product = new Product({
      name,
      category,
      price: Number(price),
      description,
      imageUrl: imageUrl || undefined,
      // Dynamic specifications object (flexible schema)
      specifications: specifications || {},
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [])
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product
 */
router.put('/:id', async (req, res) => {
  try {
    const { name, category, price, description, imageUrl, specifications, tags } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = Number(price);
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (specifications !== undefined) updateData.specifications = specifications;
    if (tags !== undefined) {
      updateData.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product and cascade delete all its reviews
 */
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Cascade delete associated reviews
    await Review.deleteMany({ productId: req.params.id });

    res.json({
      success: true,
      message: 'Product and all associated reviews deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});

module.exports = router;

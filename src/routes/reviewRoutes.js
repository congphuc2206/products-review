/**
 * Review Routes (CRUD + Stats)
 */

const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/Review');
const Product = require('../models/Product');

/**
 * @route   GET /api/products/:productId/reviews
 * @desc    Get all reviews for a product with breakdown statistics
 */
router.get('/', async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    // Calculate rating distribution (5-star count, 4-star count, etc.)
    const ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      if (ratingBreakdown[r.rating] !== undefined) {
        ratingBreakdown[r.rating]++;
      }
    });

    res.json({
      success: true,
      count: reviews.length,
      ratingBreakdown,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching reviews',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/products/:productId/reviews
 * @desc    Create a review for a specific product
 */
router.post('/', async (req, res) => {
  try {
    const { productId } = req.params;
    const { author, rating, title, comment, pros, cons, tags, images } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!rating || !title || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Rating, title, and comment are required'
      });
    }

    // Helper to sanitize array inputs (split comma strings or accept array)
    const sanitizeArray = (val) => {
      if (Array.isArray(val)) return val.filter(v => typeof v === 'string' && v.trim() !== '');
      if (typeof val === 'string') return val.split('\n').map(v => v.trim()).filter(Boolean);
      return [];
    };

    const review = new Review({
      productId,
      author: author || 'Anonymous',
      rating: Number(rating),
      title,
      comment,
      pros: sanitizeArray(pros),
      cons: sanitizeArray(cons),
      tags: sanitizeArray(tags),
      images: sanitizeArray(images)
    });

    const savedReview = await review.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: savedReview
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting review',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/reviews/:id
 * @desc    Get single review by review ID
 */
router.get('/single/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching review',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/reviews/:id
 * @desc    Update an existing review
 */
router.put('/single/:id', async (req, res) => {
  try {
    const { author, rating, title, comment, pros, cons, tags, images } = req.body;

    const sanitizeArray = (val) => {
      if (Array.isArray(val)) return val.filter(v => typeof v === 'string' && v.trim() !== '');
      if (typeof val === 'string') return val.split('\n').map(v => v.trim()).filter(Boolean);
      return [];
    };

    const updateData = {};
    if (author !== undefined) updateData.author = author;
    if (rating !== undefined) updateData.rating = Number(rating);
    if (title !== undefined) updateData.title = title;
    if (comment !== undefined) updateData.comment = comment;
    if (pros !== undefined) updateData.pros = sanitizeArray(pros);
    if (cons !== undefined) updateData.cons = sanitizeArray(cons);
    if (tags !== undefined) updateData.tags = sanitizeArray(tags);
    if (images !== undefined) updateData.images = sanitizeArray(images);

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Trigger average rating recalculation
    await Review.calculateAverageRating(updatedReview.productId);

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: updatedReview
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating review',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Delete a review
 */
router.delete('/single/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Recalculate average rating on product
    await Review.calculateAverageRating(deletedReview.productId);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
});

module.exports = router;

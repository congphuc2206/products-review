/**
 * Review Model
 * 
 * Demonstrates MongoDB Document Features:
 * - Direct references to other documents (`productId`)
 * - Flexible embedded arrays (`pros`, `cons`, `tags`, `images`)
 * - Schema validation for numeric rating (1-5)
 * - Static method to calculate and update aggregate rating on Product
 */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required']
    },
    author: {
      type: String,
      default: 'Anonymous',
      trim: true,
      maxlength: [60, 'Author name cannot exceed 60 characters']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1 star'],
      max: [5, 'Rating cannot exceed 5 stars']
    },
    title: {
      type: String,
      required: [true, 'Review title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true
    },
    // Flexible arrays demonstrating MongoDB document data types:
    pros: {
      type: [String],
      default: []
    },
    cons: {
      type: [String],
      default: []
    },
    tags: {
      type: [String],
      default: []
    },
    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

/**
 * Static method to calculate the average rating and review count for a product
 * Uses MongoDB Aggregation Pipeline: $match and $group
 */
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { productId: new mongoose.Types.ObjectId(productId) }
    },
    {
      $group: {
        _id: '$productId',
        reviewCount: { $sum: 1 },
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  const Product = mongoose.model('Product');

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      reviewCount: stats[0].reviewCount,
      averageRating: Math.round(stats[0].averageRating * 10) / 10 // Round to 1 decimal place
    });
  } else {
    // If all reviews were deleted, reset to 0
    await Product.findByIdAndUpdate(productId, {
      reviewCount: 0,
      averageRating: 0
    });
  }
};

// Call calculateAverageRating after save
reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.productId);
});

// Call calculateAverageRating after remove/delete
reviewSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.productId);
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

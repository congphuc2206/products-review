/**
 * Product Model
 * 
 * Demonstrates MongoDB's Flexible Schema:
 * Unlike relational SQL databases where every table column must be fixed in advance,
 * MongoDB allows documents in the same collection to have different shapes.
 * 
 * Here, `specifications` is defined as `mongoose.Schema.Types.Mixed` (or dynamic Object),
 * which allows:
 *  - A Laptop product to store: { "Processor": "M3 Pro", "RAM": "18GB", "Storage": "512GB SSD", "Display": "14.2 inch" }
 *  - A Running Shoe to store:  { "Material": "Mesh", "Sole Type": "Cushioned", "Sizes": "7-13 US", "Weight": "240g" }
 *  - A Coffee Maker to store:  { "Capacity": "1.8L", "Brewing Time": "5 mins", "Wattage": "1000W", "Filter": "Mesh" }
 *  - A Book to store:          { "Author": "Robert Martin", "Pages": "464", "Publisher": "Prentice", "ISBN": "978-0132350884" }
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [120, 'Product name cannot exceed 120 characters']
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'
    },
    // Demonstrating MongoDB's flexible schema:
    // Can hold any custom specifications depending on the product type!
    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    // Array of keywords/tags
    tags: {
      type: [String],
      default: []
    },
    // Aggregated rating statistics (updated automatically when reviews are added/edited/deleted)
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    read: 'secondaryPreferred' // Bắt buộc Mongoose đọc từ Read Replica (Secondary)
  }
);

// Virtual field to populate reviews for a product
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'productId'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

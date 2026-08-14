/**
 * Database Seeder Script
 * 
 * Clears existing collections and imports rich sample data
 * demonstrating MongoDB's flexible document structure.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Review = require('../models/Review');
const sampleProducts = require('./seedData');

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing Products and Reviews...');
    await Product.deleteMany({});
    await Review.deleteMany({});

    console.log('🌱 Inserting sample products with flexible specifications...');

    for (const item of sampleProducts) {
      const { reviews, ...productData } = item;

      // Create product
      const product = await Product.create(productData);

      // Create associated reviews if present
      if (reviews && reviews.length > 0) {
        for (const rev of reviews) {
          await Review.create({
            ...rev,
            productId: product._id
          });
        }
      }
    }

    console.log('✅ Database seeded successfully!');
    console.log(`📦 Seeded ${sampleProducts.length} diverse products.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// If run directly via node seeder.js
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;

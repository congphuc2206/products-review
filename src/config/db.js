/**
 * MongoDB Connection Configuration
 * 
 * This file manages the Mongoose connection to the MongoDB database.
 * It reads the MONGODB_URI from the environment variables (.env).
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/product_review_db';
    
    console.log(`Connecting to MongoDB at: ${mongoURI}...`);

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 4000
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // In a beginner project, we log helpful instructions when MongoDB isn't running yet
    console.log('💡 Tip: Make sure MongoDB is running locally or provide a valid MONGODB_URI in your .env file.');
    throw error;
  }
};

module.exports = connectDB;

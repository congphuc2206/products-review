/**
 * Database Seeder Script
 * 
 * Nạp dữ liệu mẫu vào MongoDB DBaaS
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

    console.log('🌱 Bắt đầu nạp dữ liệu mẫu vào MongoDB...');

    // Dọn bảng cũ nếu có quyền xóa, nếu không có quyền xóa thì bỏ qua
    try {
      await Product.deleteMany({});
      await Review.deleteMany({});
      console.log('🗑️  Đã dọn dẹp các bảng cũ.');
    } catch (delErr) {
      console.log('ℹ️  Bỏ qua dọn bảng cũ, tiến hành thêm mới trực tiếp...');
    }

    let successCount = 0;
    for (const item of sampleProducts) {
      const { reviews, ...productData } = item;

      // Tạo sản phẩm
      const product = await Product.create(productData);
      successCount++;

      // Tạo đánh giá kèm theo
      if (reviews && reviews.length > 0) {
        for (const rev of reviews) {
          await Review.create({
            ...rev,
            productId: product._id
          });
        }
      }
    }

    console.log(`✅ Nạp dữ liệu thành công! Đã tạo ${successCount} sản phẩm mẫu.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi nạp dữ liệu:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;

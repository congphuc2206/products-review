/**
 * MongoDB Connection Configuration
 * 
 * Quản lý kết nối Mongoose tới MongoDB DBaaS trên CMC Cloud.
 * Tích hợp in IP máy chủ thực tế (event.address) cho mỗi câu lệnh MongoDB.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/productsReviewDB';
    
    console.log(`🔌 [Database Connection] Đang kết nối tới DBaaS trên CMC Cloud...`);

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      monitorCommands: true // Bật giám sát mạng để lấy IP máy chủ thật
    });

    // Lắng nghe trực tiếp từ MongoDB Driver để in ra IP máy chủ thật
    try {
      const client = conn.connection.getClient();
      client.on('commandSucceeded', (event) => {
        if (['find', 'insert', 'update', 'delete', 'aggregate', 'distinct'].includes(event.commandName)) {
          const isRead = ['find', 'aggregate', 'distinct', 'count'].includes(event.commandName);
          const roleLabel = isRead ? '📖 [Read Replica (Secondary)]' : '✏️ [Primary Node]';
          console.log(`📡 [IP Máy Chủ] Lệnh "${event.commandName}" -> Server IP: ${event.address} | ${roleLabel}`);
        }
      });
    } catch (err) {
      // Fallback
    }

    console.log(`✅ [Database Connected] Đã kết nối thành công tới Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ [Database Error] Kết nối thất bại: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;

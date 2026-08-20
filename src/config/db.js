/**
 * MongoDB Connection Configuration
 * 
 * Quản lý kết nối Mongoose tới MongoDB DBaaS (CMC Cloud / MongoDB Atlas / Local).
 * Tích hợp tính năng Monitor Commands để bắt trực tiếp IP thực tế của máy chủ xử lý truy vấn.
 */

const mongoose = require('mongoose');

// Helper ẩn mật khẩu khi in ra log
const maskConnectionString = (uri) => {
  if (!uri) return '';
  return uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:******@');
};

const buildMongoURI = () => {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '27017';
  const dbName = process.env.DB_NAME || 'product_review_db';
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASSWORD;
  const replicaSet = process.env.DB_REPLICA_SET;
  const readPref = process.env.DB_READ_PREFERENCE || 'secondaryPreferred';

  let auth = '';
  if (user && pass) {
    auth = `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@`;
  }

  let options = [];
  if (replicaSet) options.push(`replicaSet=${replicaSet}`);
  if (readPref) options.push(`readPreference=${readPref}`);
  if (user) options.push(`authSource=admin`);

  const queryStr = options.length > 0 ? `?${options.join('&')}` : '';
  return `mongodb://${auth}${host}:${port}/${dbName}${queryStr}`;
};

const connectDB = async () => {
  try {
    const mongoURI = buildMongoURI();
    
    console.log(`🔌 [Database Connection] Đang kết nối tới: ${maskConnectionString(mongoURI)}...`);

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      monitorCommands: true // Bật giám sát mạng thực tế của MongoDB Driver
    });

    // Lắng nghe trực tiếp từ Network Socket của MongoDB Driver để in IP thực tế
    try {
      const client = conn.connection.getClient();
      client.on('commandSucceeded', (event) => {
        if (['find', 'insert', 'update', 'delete', 'aggregate'].includes(event.commandName)) {
          const isRead = ['find', 'aggregate'].includes(event.commandName);
          const roleLabel = isRead ? '📖 [Read Replica (Secondary)]' : '✏️ [Primary Node]';
          console.log(`📡 [Mạng Thực Tế] Lệnh "${event.commandName}" đã chạy tại IP: ${event.address} (${event.duration}ms) | ${roleLabel}`);
        }
      });
    } catch (e) {
      // Fallback nếu driver version không hỗ trợ getClient
    }

    console.log(`✅ [Database Connected] Đã kết nối thành công tới Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ [Database Error] Kết nối thất bại: ${error.message}`);
    console.log('💡 Tip: Kiểm tra lại Username, Password trong file .env và Security Group trên CMC Cloud');
    throw error;
  }
};

module.exports = connectDB;

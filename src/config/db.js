/**
 * MongoDB Connection Configuration
 * 
 * Quản lý kết nối Mongoose tới MongoDB DBaaS (CMC Cloud / MongoDB Atlas / Local).
 * Hỗ trợ cả 2 cách cấu hình biến môi trường:
 *   1. Qua MONGODB_URI
 *   2. Qua các biến tách rời (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME)
 * Tuân thủ tiêu chí an toàn: Mật khẩu (credentials) được che chắn, không bao giờ in ra log.
 */

const mongoose = require('mongoose');

// Helper ẩn mật khẩu khi in ra log (Bảo mật tiêu chuẩn Lab)
const maskConnectionString = (uri) => {
  if (!uri) return '';
  return uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:******@');
};

const buildMongoURI = () => {
  // Nếu có sẵn MONGODB_URI thì ưu tiên dùng
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  // Hoặc ghép từ các biến môi trường tách rời (DB_HOST, DB_USER, ...)
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
    
    // In log kết nối (Đã che mật khẩu để đảm bảo an toàn)
    console.log(`🔌 [Database Connection] Kết nối tới: ${maskConnectionString(mongoURI)}...`);

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 4000
    });

    // Mongoose query logger: In chi tiết từng câu lệnh truy vấn MongoDB vào terminal
    mongoose.set('debug', (collectionName, method, query, doc) => {
      const isRead = ['find', 'findOne', 'findById', 'count', 'distinct', 'aggregate'].includes(method);
      const targetNode = isRead ? '📖 [Read Replica / Secondary]' : '✏️ [Primary Node]';
      console.log(`🍃 [MongoDB Query -> ${targetNode}] ${collectionName}.${method}(${JSON.stringify(query || {})})`);
    });

    console.log(`✅ [Database Connected] Máy chủ DB: ${conn.connection.host} | DB Name: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ [Database Error] Kết nối thất bại: ${error.message}`);
    console.log('💡 Tip: Kiểm tra Security Group trên CMC Cloud (mở port 27017) và thông tin trong file .env');
    throw error;
  }
};

module.exports = connectDB;

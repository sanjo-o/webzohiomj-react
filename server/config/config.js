require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/pawfund',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  env: process.env.NODE_ENV || 'development',
  upload: {
    path: process.env.UPLOAD_PATH || 'uploads',
    maxSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB
  }
  // Add other configuration as needed
}; 
const app = require('./app');
const pool = require('./config/db');
const dotenv = require('dotenv');
const initDatabase = require('./utils/dbInit');

dotenv.config();

// Get port from environment variable or use default
const PORT = process.env.PORT || 5000;

// Test database connection
const testDBConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
};

// Start server
const startServer = async () => {
  try {
    await testDBConnection();
    
    // Initialize database tables
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 CITS Backend server running on http://localhost:${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📦 Version: 1.0.0`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

// Start the server
startServer();
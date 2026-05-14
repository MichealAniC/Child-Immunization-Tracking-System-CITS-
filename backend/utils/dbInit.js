const pool = require('../config/db');

// Database initialization script
const initDatabase = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'parent')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Users table created successfully');
    
    // Create children table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS children (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        gender VARCHAR(20),
        parent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Children table created successfully');
    
    // Create vaccines table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vaccines (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        vaccine_name VARCHAR(255) NOT NULL,
        recommended_age VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Vaccines table created successfully');
    
    // Create immunization_records table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS immunization_records (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
        vaccine_id UUID NOT NULL REFERENCES vaccines(id) ON DELETE CASCADE,
        date_administered DATE,
        status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed', 'missed', 'upcoming')),
        administered_by UUID REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Immunization records table created successfully');
    
    // Create notifications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
        message TEXT NOT NULL,
        notification_type VARCHAR(20) NOT NULL CHECK (notification_type IN ('sms', 'email')),
        sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Notifications table created successfully');
    
  } catch (err) {
    console.error('❌ Error initializing database:', err.message);
    throw err;
  }
};

module.exports = initDatabase;
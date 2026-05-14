const pool = require('../config/db');

// User model
const User = {
  // Get all users
  getAll: async () => {
    try {
      const result = await pool.query('SELECT id, full_name, email, role, created_at FROM users ORDER BY created_at DESC');
      return result.rows;
    } catch (err) {
      throw new Error(`Error fetching users: ${err.message}`);
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const result = await pool.query('SELECT id, full_name, email, role, created_at FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error fetching user: ${err.message}`);
    }
  },

  // Get user by email
  getByEmail: async (email) => {
    try {
      const result = await pool.query('SELECT id, full_name, email, password_hash, role, created_at FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error fetching user by email: ${err.message}`);
    }
  },

  // Create new user
  create: async (userData) => {
    try {
      const { full_name, email, password_hash, role } = userData;
      
      const result = await pool.query(
        'INSERT INTO users (full_name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, full_name, email, role, created_at',
        [full_name, email, password_hash, role]
      );
      
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error creating user: ${err.message}`);
    }
  }
};

module.exports = User;
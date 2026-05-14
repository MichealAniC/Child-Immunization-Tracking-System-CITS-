const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

// Auth controller
const authController = {
  // Register user
  register: async (req, res) => {
    try {
      const { full_name, email, password, role } = req.body;
      
      // Validate input
      if (!full_name || !email || !password || !role) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide all required fields.' 
        });
      }
      
      // Check if user exists
      const existingUser = await User.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'User already exists with this email.' 
        });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);
      
      // Create user
      const userData = {
        full_name,
        email,
        password_hash,
        role
      };
      
      const user = await User.create(userData);
      
      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      };
      
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
      
      res.status(201).json({ 
        success: true, 
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          created_at: user.created_at
        }
      });
      
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during registration.' 
      });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide email and password.' 
        });
      }
      
      // Check if user exists
      const user = await User.getByEmail(email);
      if (!user) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid credentials.' 
        });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid credentials.' 
        });
      }
      
      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      };
      
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
      
      res.status(200).json({ 
        success: true, 
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          created_at: user.created_at
        }
      });
      
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during login.' 
      });
    }
  }
};

module.exports = authController;
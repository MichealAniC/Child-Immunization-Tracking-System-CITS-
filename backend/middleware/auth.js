const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Authentication middleware
const auth = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  
  // Check if no token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }
  
  // Get token
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ 
      success: false, 
      message: 'Token is not valid.' 
    });
  }
};

module.exports = auth;
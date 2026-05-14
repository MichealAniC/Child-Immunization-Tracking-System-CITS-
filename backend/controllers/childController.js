const Child = require('../models/child');

// Child controller
const childController = {
  // Get all children (admin only)
  getAll: async (req, res) => {
    try {
      // Only admins can view all children
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Admin role required.' 
        });
      }
      
      const children = await Child.getAll();
      res.status(200).json({ 
        success: true, 
        count: children.length,
        data: children 
      });
      
    } catch (err) {
      console.error('Get all children error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error fetching children.' 
      });
    }
  },

  // Get child by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Parents can only access their own children
      if (req.user.role === 'parent') {
        const child = await Child.getById(id);
        if (!child || child.parent_id !== req.user.id) {
          return res.status(403).json({ 
            success: false, 
            message: 'Access denied. You can only access your own children.' 
          });
        }
      }
      
      const child = await Child.getById(id);
      if (!child) {
        return res.status(404).json({ 
          success: false, 
          message: 'Child not found.' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        data: child 
      });
      
    } catch (err) {
      console.error('Get child by ID error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error fetching child.' 
      });
    }
  },

  // Get children by parent ID (for parents)
  getByParentId: async (req, res) => {
    try {
      // Parents can only access their own children
      if (req.user.role !== 'parent') {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Parent role required.' 
        });
      }
      
      const children = await Child.getByParentId(req.user.id);
      res.status(200).json({ 
        success: true, 
        count: children.length,
        data: children 
      });
      
    } catch (err) {
      console.error('Get children by parent ID error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error fetching children.' 
      });
    }
  },

  // Create new child
  create: async (req, res) => {
    try {
      const { full_name, date_of_birth, gender } = req.body;
      
      // Validate input
      if (!full_name || !date_of_birth) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide full name and date of birth.' 
        });
      }
      
      // Parents can only register their own children
      if (req.user.role !== 'parent') {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Only parents can register children.' 
        });
      }
      
      // Create child with parent ID
      const childData = {
        full_name,
        date_of_birth,
        gender,
        parent_id: req.user.id
      };
      
      const child = await Child.create(childData);
      
      res.status(201).json({ 
        success: true, 
        message: 'Child registered successfully',
        data: child 
      });
      
    } catch (err) {
      console.error('Create child error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error registering child.' 
      });
    }
  },

  // Update child
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { full_name, date_of_birth, gender } = req.body;
      
      // Validate input
      if (!full_name && !date_of_birth && !gender) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide at least one field to update.' 
        });
      }
      
      // Parents can only update their own children
      if (req.user.role === 'parent') {
        const child = await Child.getById(id);
        if (!child || child.parent_id !== req.user.id) {
          return res.status(403).json({ 
            success: false, 
            message: 'Access denied. You can only update your own children.' 
          });
        }
      }
      
      const childData = {
        full_name,
        date_of_birth,
        gender
      };
      
      const child = await Child.update(id, childData);
      
      res.status(200).json({ 
        success: true, 
        message: 'Child updated successfully',
        data: child 
      });
      
    } catch (err) {
      console.error('Update child error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error updating child.' 
      });
    }
  },

  // Delete child
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Parents can only delete their own children
      if (req.user.role === 'parent') {
        const child = await Child.getById(id);
        if (!child || child.parent_id !== req.user.id) {
          return res.status(403).json({ 
            success: false, 
            message: 'Access denied. You can only delete your own children.' 
          });
        }
      }
      
      const deleted = await Child.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: 'Child not found.' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Child deleted successfully' 
      });
      
    } catch (err) {
      console.error('Delete child error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error deleting child.' 
      });
    }
  }
};

module.exports = childController;
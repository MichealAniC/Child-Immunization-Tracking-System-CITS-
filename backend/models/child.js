const pool = require('../config/db');

// Child model
const Child = {
  // Get all children
  getAll: async () => {
    try {
      const result = await pool.query(
        'SELECT c.id, c.full_name, c.date_of_birth, c.gender, c.created_at, u.full_name as parent_name, u.email as parent_email FROM children c JOIN users u ON c.parent_id = u.id ORDER BY c.created_at DESC'
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Error fetching children: ${err.message}`);
    }
  },

  // Get child by ID
  getById: async (id) => {
    try {
      const result = await pool.query(
        'SELECT c.id, c.full_name, c.date_of_birth, c.gender, c.created_at, u.full_name as parent_name, u.email as parent_email FROM children c JOIN users u ON c.parent_id = u.id WHERE c.id = $1',
        [id]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error fetching child: ${err.message}`);
    }
  },

  // Get children by parent ID
  getByParentId: async (parentId) => {
    try {
      const result = await pool.query(
        'SELECT c.id, c.full_name, c.date_of_birth, c.gender, c.created_at FROM children c WHERE c.parent_id = $1 ORDER BY c.created_at DESC',
        [parentId]
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Error fetching children by parent: ${err.message}`);
    }
  },

  // Create new child
  create: async (childData) => {
    try {
      const { full_name, date_of_birth, gender, parent_id } = childData;
      
      const result = await pool.query(
        'INSERT INTO children (full_name, date_of_birth, gender, parent_id) VALUES ($1, $2, $3, $4) RETURNING id, full_name, date_of_birth, gender, parent_id, created_at',
        [full_name, date_of_birth, gender, parent_id]
      );
      
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error creating child: ${err.message}`);
    }
  },

  // Update child
  update: async (id, childData) => {
    try {
      const { full_name, date_of_birth, gender } = childData;
      
      const result = await pool.query(
        'UPDATE children SET full_name = $1, date_of_birth = $2, gender = $3 WHERE id = $4 RETURNING id, full_name, date_of_birth, gender, parent_id, created_at',
        [full_name, date_of_birth, gender, id]
      );
      
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error updating child: ${err.message}`);
    }
  },

  // Delete child
  delete: async (id) => {
    try {
      const result = await pool.query(
        'DELETE FROM children WHERE id = $1 RETURNING id',
        [id]
      );
      
      return result.rowCount > 0;
    } catch (err) {
      throw new Error(`Error deleting child: ${err.message}`);
    }
  }
};

module.exports = Child;
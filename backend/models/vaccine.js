const pool = require('../config/db');

// Vaccine model
const Vaccine = {
  // Get all vaccines
  getAll: async () => {
    try {
      const result = await pool.query(
        'SELECT id, vaccine_name, recommended_age, description, created_at FROM vaccines ORDER BY vaccine_name'
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Error fetching vaccines: ${err.message}`);
    }
  },

  // Get vaccine by ID
  getById: async (id) => {
    try {
      const result = await pool.query(
        'SELECT id, vaccine_name, recommended_age, description, created_at FROM vaccines WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error fetching vaccine: ${err.message}`);
    }
  },

  // Create new vaccine
  create: async (vaccineData) => {
    try {
      const { vaccine_name, recommended_age, description } = vaccineData;
      
      const result = await pool.query(
        'INSERT INTO vaccines (vaccine_name, recommended_age, description) VALUES ($1, $2, $3) RETURNING id, vaccine_name, recommended_age, description, created_at',
        [vaccine_name, recommended_age, description]
      );
      
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error creating vaccine: ${err.message}`);
    }
  }
};

module.exports = Vaccine;
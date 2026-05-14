const pool = require('../config/db');

// Immunization record model
const ImmunizationRecord = {
  // Get all immunization records for a child
  getByChildId: async (childId) => {
    try {
      const result = await pool.query(
        `SELECT 
          ir.id,
          ir.child_id,
          ir.vaccine_id,
          ir.date_administered,
          ir.status,
          ir.created_at,
          v.vaccine_name,
          v.recommended_age,
          u.full_name as administered_by_name
        FROM immunization_records ir
        JOIN vaccines v ON ir.vaccine_id = v.id
        LEFT JOIN users u ON ir.administered_by = u.id
        WHERE ir.child_id = $1
        ORDER BY ir.created_at DESC`
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Error fetching immunization records: ${err.message}`);
    }
  },

  // Get immunization record by ID
  getById: async (id) => {
    try {
      const result = await pool.query(
        `SELECT 
          ir.id,
          ir.child_id,
          ir.vaccine_id,
          ir.date_administered,
          ir.status,
          ir.created_at,
          v.vaccine_name,
          v.recommended_age,
          u.full_name as administered_by_name
        FROM immunization_records ir
        JOIN vaccines v ON ir.vaccine_id = v.id
        LEFT JOIN users u ON ir.administered_by = u.id
        WHERE ir.id = $1`
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error fetching immunization record: ${err.message}`);
    }
  },

  // Create new immunization record
  create: async (recordData) => {
    try {
      const { child_id, vaccine_id, date_administered, status, administered_by } = recordData;
      
      const result = await pool.query(
        'INSERT INTO immunization_records (child_id, vaccine_id, date_administered, status, administered_by) VALUES ($1, $2, $3, $4, $5) RETURNING id, child_id, vaccine_id, date_administered, status, administered_by, created_at',
        [child_id, vaccine_id, date_administered, status, administered_by]
      );
      
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error creating immunization record: ${err.message}`);
    }
  },

  // Update immunization record
  update: async (id, recordData) => {
    try {
      const { date_administered, status, administered_by } = recordData;
      
      const result = await pool.query(
        'UPDATE immunization_records SET date_administered = $1, status = $2, administered_by = $3 WHERE id = $4 RETURNING id, child_id, vaccine_id, date_administered, status, administered_by, created_at',
        [date_administered, status, administered_by, id]
      );
      
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error updating immunization record: ${err.message}`);
    }
  }
};

module.exports = ImmunizationRecord;
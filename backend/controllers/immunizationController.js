const Vaccine = require('../models/vaccine');
const ImmunizationRecord = require('../models/immunizationRecord');
const Child = require('../models/child');
const immunizationUtils = require('../utils/immunizationUtils');

// Immunization controller
const immunizationController = {
  // Get all vaccines
  getAllVaccines: async (req, res) => {
    try {
      const vaccines = await Vaccine.getAll();
      res.status(200).json({ 
        success: true, 
        count: vaccines.length,
        data: vaccines 
      });
      
    } catch (err) {
      console.error('Get all vaccines error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error fetching vaccines.' 
      });
    }
  },

  // Get vaccine by ID
  getVaccineById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const vaccine = await Vaccine.getById(id);
      if (!vaccine) {
        return res.status(404).json({ 
          success: false, 
          message: 'Vaccine not found.' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        data: vaccine 
      });
      
    } catch (err) {
      console.error('Get vaccine by ID error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error fetching vaccine.' 
      });
    }
  },

  // Create new vaccine (admin only)
  createVaccine: async (req, res) => {
    try {
      // Only admins can create vaccines
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Admin role required.' 
        });
      }
      
      const { vaccine_name, recommended_age, description } = req.body;
      
      // Validate input
      if (!vaccine_name) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide vaccine name.' 
        });
      }
      
      const vaccineData = {
        vaccine_name,
        recommended_age,
        description
      };
      
      const vaccine = await Vaccine.create(vaccineData);
      
      res.status(201).json({ 
        success: true, 
        message: 'Vaccine created successfully',
        data: vaccine 
      });
      
    } catch (err) {
      console.error('Create vaccine error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error creating vaccine.' 
      });
    }
  },

  // Get immunization records for a child
  getImmunizationRecords: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Parents can only access their own children's records
      if (req.user.role === 'parent') {
        const child = await Child.getById(id);
        if (!child || child.parent_id !== req.user.id) {
          return res.status(403).json({ 
            success: false, 
            message: 'Access denied. You can only access your own children\'s records.'
          });
        }
      }
      
      const records = await ImmunizationRecord.getByChildId(id);
      
      res.status(200).json({ 
        success: true, 
        count: records.length,
        data: records 
      });
      
    } catch (err) {
      console.error('Get immunization records error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error fetching immunization records.' 
      });
    }
  },

  // Get immunization record by ID
  getImmunizationRecordById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const record = await ImmunizationRecord.getById(id);
      if (!record) {
        return res.status(404).json({ 
          success: false, 
          message: 'Immunization record not found.' 
        });
      }
      
      // Parents can only access their own children's records
      if (req.user.role === 'parent') {
        const child = await Child.getById(record.child_id);
        if (!child || child.parent_id !== req.user.id) {
          return res.status(403).json({ 
            success: false, 
            message: 'Access denied. You can only access your own children\'s records.'
          });
        }
      }
      
      res.status(200).json({ 
        success: true, 
        data: record 
      });
      
    } catch (err) {
      console.error('Get immunization record by ID error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error fetching immunization record.' 
      });
    }
  },

  // Create new immunization record
  createImmunizationRecord: async (req, res) => {
    try {
      const { child_id, vaccine_id, date_administered, status } = req.body;
      
      // Validate input
      if (!child_id || !vaccine_id || !status) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide child_id, vaccine_id, and status.' 
        });
      }
      
      // Only admins can record immunizations
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Only healthcare workers can record immunizations.' 
        });
      }
      
      // Check if child exists
      const child = await Child.getById(child_id);
      if (!child) {
        return res.status(404).json({ 
          success: false, 
          message: 'Child not found.' 
        });
      }
      
      // Check if vaccine exists
      const vaccine = await Vaccine.getById(vaccine_id);
      if (!vaccine) {
        return res.status(404).json({ 
          success: false, 
          message: 'Vaccine not found.' 
        });
      }
      
      const recordData = {
        child_id,
        vaccine_id,
        date_administered,
        status,
        administered_by: req.user.id
      };
      
      const record = await ImmunizationRecord.create(recordData);
      
      res.status(201).json({ 
        success: true, 
        message: 'Immunization record created successfully',
        data: record 
      });
      
    } catch (err) {
      console.error('Create immunization record error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error creating immunization record.' 
      });
    }
  },

  // Update immunization record
  updateImmunizationRecord: async (req, res) => {
    try {
      const { id } = req.params;
      const { date_administered, status } = req.body;
      
      // Validate input
      if (!date_administered && !status) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide at least one field to update.' 
        });
      }
      
      // Only admins can update immunization records
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. Only healthcare workers can update immunization records.' 
        });
      }
      
      const recordData = {
        date_administered,
        status,
        administered_by: req.user.id
      };
      
      const record = await ImmunizationRecord.update(id, recordData);
      
      res.status(200).json({ 
        success: true, 
        message: 'Immunization record updated successfully',
        data: record 
      });
      
    } catch (err) {
      console.error('Update immunization record error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error updating immunization record.' 
      });
    }
  },

  // Generate vaccination schedule for a child
  generateVaccinationSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Parents can only access their own children's schedules
      if (req.user.role === 'parent') {
        const child = await Child.getById(id);
        if (!child || child.parent_id !== req.user.id) {
          return res.status(403).json({ 
            success: false, 
            message: 'Access denied. You can only access your own children\'s vaccination schedule.' 
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
      
      // Get all vaccines
      const vaccines = await Vaccine.getAll();
      
      // Generate schedule
      const schedule = immunizationUtils.generateVaccinationSchedule(child.date_of_birth, vaccines);
      
      res.status(200).json({ 
        success: true, 
        message: 'Vaccination schedule generated successfully',
        data: {
          child_id: child.id,
          child_name: child.full_name,
          date_of_birth: child.date_of_birth,
          schedule: schedule
        } 
      });
      
    } catch (err) {
      console.error('Generate vaccination schedule error:', err);
      res.status(500).json({ 
        success: false, 
        message: 'Server error generating vaccination schedule.' 
      });
    }
  }
};

module.exports = immunizationController;
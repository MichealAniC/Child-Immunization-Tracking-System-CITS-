const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const immunizationController = require('../controllers/immunizationController');

// @route   GET /api/vaccines
// @desc    Get all vaccines
// @access  Public
router.get('/vaccines', immunizationController.getAllVaccines);

// @route   GET /api/vaccines/:id
// @desc    Get vaccine by ID
// @access  Public
router.get('/vaccines/:id', immunizationController.getVaccineById);

// @route   POST /api/vaccines
// @desc    Create new vaccine (admin only)
// @access  Private - Admin
router.post('/vaccines', auth, immunizationController.createVaccine);

// @route   GET /api/children/:id/immunizations
// @desc    Get immunization records for a child
// @access  Private - Admin or Parent (own children)
router.get('/children/:id/immunizations', auth, immunizationController.getImmunizationRecords);

// @route   GET /api/immunizations/:id
// @desc    Get immunization record by ID
// @access  Private - Admin or Parent (own children)
router.get('/immunizations/:id', auth, immunizationController.getImmunizationRecordById);

// @route   POST /api/immunizations
// @desc    Create new immunization record
// @access  Private - Admin
router.post('/immunizations', auth, immunizationController.createImmunizationRecord);

// @route   PUT /api/immunizations/:id
// @desc    Update immunization record
// @access  Private - Admin
router.put('/immunizations/:id', auth, immunizationController.updateImmunizationRecord);

// @route   GET /api/children/:id/schedule
// @desc    Generate vaccination schedule for a child
// @access  Private - Admin or Parent (own children)
router.get('/children/:id/schedule', auth, immunizationController.generateVaccinationSchedule);

module.exports = router;
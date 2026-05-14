const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const childController = require('../controllers/childController');

// @route   GET /api/children
// @desc    Get all children (admin only)
// @access  Private - Admin
router.get('/', auth, childController.getAll);

// @route   GET /api/children/:id
// @desc    Get child by ID
// @access  Private - Admin or Parent (own children)
router.get('/:id', auth, childController.getById);

// @route   GET /api/children/parent
// @desc    Get children by parent ID (for parents)
// @access  Private - Parent
router.get('/parent', auth, childController.getByParentId);

// @route   POST /api/children
// @desc    Create new child
// @access  Private - Parent
router.post('/', auth, childController.create);

// @route   PUT /api/children/:id
// @desc    Update child
// @access  Private - Admin or Parent (own children)
router.put('/:id', auth, childController.update);

// @route   DELETE /api/children/:id
// @desc    Delete child
// @access  Private - Admin or Parent (own children)
router.delete('/:id', auth, childController.delete);

module.exports = router;
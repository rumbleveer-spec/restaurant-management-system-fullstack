const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

// Create a new table reservation
router.post('/', tableController.createTableReservation);

// Get all table reservations
router.get('/', tableController.getAllTableReservations);

// Get a specific table reservation by ID
router.get('/:id', tableController.getTableReservationById);

// Update a table reservation by ID
router.put('/:id', tableController.updateTableReservation);

// Delete a table reservation by ID
router.delete('/:id', tableController.deleteTableReservation);

module.exports = router;
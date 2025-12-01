const Table = require('../models/table');

// Create a new table
exports.createTableReservation = async (req, res) => {
    try {
        const table = new Table(req.body);
        await table.save();
        res.status(201).json(table);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tables
exports.getAllTableReservations = async (req, res) => {
    try {
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific table by ID
exports.getTableReservationById = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a table by ID
exports.updateTableReservation = async (req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.status(200).json(table);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a table by ID
exports.deleteTableReservation = async (req, res) => {
    try {
        const table = await Table.findByIdAndDelete(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
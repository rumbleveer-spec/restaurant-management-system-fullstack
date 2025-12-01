const Inventory = require('../models/inventory');

// Get all inventory items
exports.getAllInventory = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single inventory item by Code
exports.getInventoryByCode = async (req, res) => {
    try {
        const item = await Inventory.findOne({ itemCode: req.params.code });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new inventory item
exports.createInventoryItem = async (req, res) => {
    try {
        const item = new Inventory(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an inventory item
exports.updateInventoryItem = async (req, res) => {
    try {
        const item = await Inventory.findOneAndUpdate(
            { itemCode: req.params.code },
            req.body,
            { new: true }
        );
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an inventory item
exports.deleteInventoryItem = async (req, res) => {
    try {
        const item = await Inventory.findOneAndDelete({ itemCode: req.params.code });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

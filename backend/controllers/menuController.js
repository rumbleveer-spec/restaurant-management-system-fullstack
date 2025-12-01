const Menu = require('../models/menu');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
    console.log('getAllMenuItems called');
    try {
        const menuItems = await Menu.find();
        console.log('Menu items found:', menuItems);
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single menu item by ID
exports.getMenuItemById = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new menu item
exports.createMenuItem = async (req, res) => {
    try {
        const menuItem = new Menu(req.body);
        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing menu item
exports.updateMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndDelete(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
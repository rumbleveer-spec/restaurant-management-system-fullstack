const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    itemCode: { type: String, required: true, unique: true },
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    unit: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    expiryDate: { type: Date },
    minStockLevel: { type: Number, default: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);

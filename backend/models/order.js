const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        menuItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    customerDetails: {
        name: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
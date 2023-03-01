const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    orderedItems: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    },
    paymentDate: {
        type: Date
    }
}, { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;



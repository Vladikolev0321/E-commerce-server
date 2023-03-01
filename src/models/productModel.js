const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    // 
    checked: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        default: "all"
    },
    countInStock: {
        type: Number,
        default: 0
    },
    sold : {
        type: Number,
        default: 0
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

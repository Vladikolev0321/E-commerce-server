const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const createOrder = async (req, res) => {
    try {
        const currUser = await User.findById(req.user._id);
        console.log("currUser", currUser);
        const { mobile, address, orderedItems, totalPrice } = req.body;

        if (!mobile || !address || !orderedItems || !totalPrice) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const order = new Order({
            user: currUser._id,
            mobile,
            address,
            orderedItems,
            totalPrice
        });

        await order.save();

        // Update products countInStock and sold
        orderedItems.map(async (item) => {
            await Product.findOneAndUpdate({ _id: item._id }, {
                countInStock: item.countInStock - item.quantity,
                sold: item.sold + item.quantity
            }
            )
        });

        console.log("order", order);

        res.status(201).json({ message: "Order created successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createOrder,
    getOrders
};
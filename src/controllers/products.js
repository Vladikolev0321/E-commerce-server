const Product = require("../models/productModel");

const getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json({products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const getProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({ message: "Product not found" });
        
        res.json({product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProduct
}
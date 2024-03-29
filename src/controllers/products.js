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

const createProduct = async (req, res) => {
    try{
        console.log(req.body);
        const { name, price, description, countInStock, images } = req.body;
        if(!name || !price || !description || !countInStock || !images){
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            countInStock,
            images
        });

        await newProduct.save();

        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try{
        const { name, price, description, countInStock, images } = req.body;
        if(!name || !price || !description || !countInStock || !images){
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({ message: "Product not found" });

        product.name = name;
        product.price = price;
        product.description = description;
        product.countInStock = countInStock;
        product.images = images;

        await product.save();

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({ message: "Product not found" });

        await product.remove();

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
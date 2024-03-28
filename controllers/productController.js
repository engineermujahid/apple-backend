import { product } from "../Models/productModel.js";

export const addProduct = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const newProduct = new product({ name, price, description });
        await newProduct.save();
        return res.status(201).json({ product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getProducts = async (req, res) => {
    try {
        const data = await product.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

import productModel from "../models/productModel.js";

export const getSingleProduct = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400);
    }
}

export const getProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({});
        res.status(200).json(products);
    } catch (err) { 
        res.status(400);
    }
}
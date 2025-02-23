import productModel from "../models/productModel.js";

// route   api/v1/product-details/:id
export const getSingleProduct = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.id);
        return res.status(200).json({message: "Successfully Product fetched", product, success: true});
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}

export const getProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({});
        return res.status(200).json({message: "Successfully Product fetched", products, success: true});
    } catch (err) { 
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}
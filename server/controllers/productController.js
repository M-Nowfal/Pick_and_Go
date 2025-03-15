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

//route api/v1/get-product
export const getProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({});
        return res.status(200).json({message: "Successfully Product fetched", products, success: true});
    } catch (err) { 
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
}

//route api/v1/seller/add-product
export const addProduct = async (req, res, next) => {
    try {
        const { name, price, description, stock, brand, category, image1, image2, image3, sellerId, ratings } = req.body.productDetails;
        if (image1 && image2 && image3) {
            await productModel.create({
                name, description, price, category, images: [image1, image2, image3], brand, stock, sellerId, ratings, verified: true
            });
        } else if (image1 && image2) {
            await productModel.create({
                name, description, price, category, images: [image1, image2], brand, stock, sellerId, ratings, verified: true
            });
        } else {
            await productModel.create({
                name, description, price, category, images: [image1 || image2 || image3], brand, stock, sellerId, ratings, verified: true
            });
        }
        return res.status(200).json({ message: "Product Added Successfully", success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/seller/update-product
export const upDateProduct = async (req, res, next) => {
    try {
        const { id, name, price, description, stock, brand, category, image1, image2, image3 } = req.body.updatedProduct;
        const product = await productModel.findByIdAndUpdate(id, {
            $set: {
                name, price, description, stock, brand, category, images: [image1, image2, image3]
            }
        });
        return res.status(200).json({ message: "Product Updated Successfully", success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/seller/remove-product/:productId
export const removeProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        await productModel.findByIdAndDelete(productId);
        return res.status(200).json({ message: "Product Deleted Successfully", success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
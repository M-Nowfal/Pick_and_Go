import mongoose from "mongoose";
import cartModel from "../models/cartModel.js";
import userModel from "../models/userModel.js";

export const addToCart = async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: "Missing required fields", success: false });
        }

        if (!await userModel.findById(userId)) {
            return res.status(404).json({ message: "Log in to add Products to Cart", success: false });
        }

        let cart = await cartModel.findOne({ userId });

        if (cart) {
            const itemIndex = cart.cartItems.findIndex(item => (
                item.productId.toString() === productId
            ));
            if (itemIndex > -1) {
                return res.status(201).json({ message: "Product already in the Cart", success: false });
            } else {
                cart.cartItems.push({ productId, quantity });
            }
            await cart.save();
            return res.status(200).json({ message: "Product Added to the Cart", success: true });
        } else {
            const newCart = new cartModel({
                userId,
                cartItems: [{ productId, quantity }]
            });
            await newCart.save();
            return res.status(201).json({ message: "Product Added to the Cart", cart: newCart });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const getCart = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID", success: false });
        }

        const cart = await cartModel.findOne({ userId }).populate("cartItems.productId");

        if (!cart) {
            return res.status(404).json({ message: "Cart is empty", success: false });
        }

        return res.status(200).json({ cart, success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const updateCart = async (req, res, next) => {
    try {
        let { userId, id, ope } = req.query;

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        let cartItem = cart.cartItems.find(item => item._id.toString() === id);

        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in cart", success: false });
        }

        if (ope === "plus") {
            cartItem.quantity += 1;
        } else if (ope === "minus" && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            return res.status(400).json({ message: "Invalid operation or quantity too low", success: false });
        }

        await cart.save();

        const newCart = await cartModel.findOne({ userId }).populate("cartItems.productId");

        res.status(200).json({ newCart , message: "Cart updated successfully", success: true });

    } catch (err) {
        console.error("Error updating cart:", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error", success: false });
    }
};

export const deleteCartProduct = async (req, res, next) => {
    try {
        const { userId, delId } = req.params;
        const cart = await cartModel.findOneAndUpdate(
            { userId },
            { $pull: { cartItems: { _id: delId } } },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false  });
        }
        res.status(200).json({ message: "Product removed from cart", success: true });
    } catch (err) {
        res.status(404).json({ message: "Internal Server Error", success: false });
    }
}
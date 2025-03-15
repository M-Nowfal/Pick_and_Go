import adminModel from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import userModel from "../models/userModel.js";
import sellerModel from "../models/sellerModel.js";
import productModel from "../models/productModel.js";

//route api/v1/admin/creation
export const createAdmin = async (req, res, next) => {
    try {
        const { name, phone, email, password } = req.body.details;
        const hasedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
        await adminModel.create({
            name, phone, email, password: hasedPassword
        });
        return res.status(200).json({ message: "Admin Created", success: true });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/admin/login
export const adminLogin = async (req, res, next) => {
    try {
        const { phone, password } = req.body.details;
        const admin = await adminModel.findOne({ phone });
        if (admin) {
            if (bcryptjs.compareSync(password, admin.password)) {
                return res.status(200).json({ message: "Successfully Logged-in as Admin", success: true });
            } else {
                return res.status(201).json({ message: "Incorrect Password", success: false });
            }
        } else {
            return res.status(201).json({ message: "No Admin found with the given phone Number", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/admin/login
export const adminLogout = async (req, res, next) => {
    try {
        const { phone, password } = req.body.details;
        const admin = await adminModel.findOne({ phone });
        if (admin) {
            if (bcryptjs.compareSync(password, admin.password)) {
                return res.status(200).json({ message: "Successfully Logged-out", success: true });
            } else {
                return res.status(201).json({ message: "Incorrect Password", success: false });
            }
        } else {
            return res.status(201).json({ message: "phone Number missmatch", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/admin/get-user-details
export const getUserDetails = async (req, res, next) => {
    try {
        const users = await userModel.find();
        if (users) {
            return res.status(200).json({ message: "Users", success: true, users });
        } else {
            return res.status(200).json({ message: "No User found", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/admin/user-delete/:userId
export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await userModel.findByIdAndDelete(userId);
        return res.status(200).json({ message: "User Deleted by Admin", success: true });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/admin/get-seller-details
export const getSellerDetails = async (req, res, next) => {
    try {
        const sellers = await sellerModel.find();
        if (sellers) {
            return res.status(200).json({ message: "Sellers", success: true, sellers });
        } else {
            return res.status(200).json({ message: "No Seller found", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/admin/seller-delete/:sellerId
export const deleteSeller = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
        await sellerModel.findByIdAndDelete(sellerId);
        await productModel.updateMany({ sellerId }, { $set: { verified: false } });
        return res.status(200).json({ message: "Seller Deleted by Admin", success: true });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
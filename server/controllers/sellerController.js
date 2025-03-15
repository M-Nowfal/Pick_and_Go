import bcryptjs from "bcryptjs";
import sellerModel from "../models/sellerModel.js";
import productModel from "../models/productModel.js";

//route api/v1/seller/sign-in
export const sellerSignIn = async (req, res, next) => {
    try {
        const { name, email, phone, password, business } = req.body.sellerDetails;
        const seller = await sellerModel.findOne({ $or: [{ email }, { phone }] });
        if (seller) {
            return res.status(201).json({ message: "Seller already exist with that email or phone", success: false });
        } else {
            const encriptedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
            const newSeller = await sellerModel.create({
                name,
                phone,
                email,
                password: encriptedPassword,
                business: {
                    businessName: business.businessName,
                    businessAddress: {
                        street: business.street,
                        city: business.city,
                        state: business.state,
                        pincode: business.pincode
                    },
                    businessType: business.type,
                    taxId: business.taxId
                }
            });
            return res.status(200).json({ message: "Seller Account created Successfully", success: true, sellerId: newSeller._id });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/seller/log-in
export const sellerLogin = async (req, res, next) => {
    try {
        const { phone, password } = req.body.sellerDetails;
        const seller = await sellerModel.findOne({ phone });
        if (seller) {
            if (bcryptjs.compareSync(password, seller.password)) {
                return res.status(200).json({ message: `Wlcome to Pick&Go Seller Page, ${seller.name}`, success: true, sellerName: `${seller.name}`, sellerId: `${seller._id}` });
            } else {
                return res.status(201).json({ message: "Incorrect Password", success: false });
            }
        } else {
            return res.status(201).json({ message: "No Seller found with that phone number", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/seller/log-out/:sellerId/:pass
export const sellerLogout = async (req, res, next) => {
    try {
        const { sellerId, pass } = req.params;
        const seller = await sellerModel.findById(sellerId);
        if (bcryptjs.compareSync(pass, seller.password)) {
            return res.status(200).json({ message: "Successfully Loged out", success: true });
        } else {
            return res.status(201).json({ message: "Incorrect Password", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/seller/log-out/:sellerId/:pass
export const sellerSignOut = async (req, res, next) => {
    try {
        const { sellerId, pass } = req.params;
        const seller = await sellerModel.findById(sellerId);
        if (bcryptjs.compareSync(pass, seller.password)) {
            await sellerModel.findOneAndDelete({ _id: sellerId });
            await productModel.updateMany({ sellerId }, { $set: { verified: false } });
            return res.status(200).json({ message: "Successfully Signed Out", success: true });
        } else {
            return res.status(200).json({ message: "Incorrect Password", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/seller/getSeller
export const getSeller = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
        const seller = await sellerModel.findById(sellerId);
        if (seller) {
            return res.status(200).json({ message: "Seller Exist", success: true, seller });
        } else {
            return res.status(201).json({ message: "Seller Not Exist", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/seller-password/:sellerId/:pass
export const getSellerPassword = async (req, res, next) => {
    try {
        const { sellerId, pass } = req.params;
        const seller = await sellerModel.findById(sellerId);
        if (bcryptjs.compareSync(pass, seller.password)) {
            return res.status(200).json({ message: "Password Correct", success: true });
        } else {
            return res.status(201).json({ message: "incorrect password", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/update-seller-details/:sellerId
export const updateSellerDetails = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
        const { updates } = req.body;
        const password = bcryptjs.hashSync(updates.password, bcryptjs.genSaltSync(10));
        const seller = await sellerModel.findByIdAndUpdate(sellerId, {
            $set: {
                name: updates.name,
                phone: updates.phone,
                email: updates.email,
                password,
                business: {
                    businessName: updates.businessName,
                    businessAddress: {
                        street: updates.businessAddress.street,
                        city: updates.businessAddress.city,
                        state: updates.businessAddress.state,
                        pincode: updates.businessAddress.pincode
                    },
                    businessType: updates.businessType,
                    taxId: updates.taxId
                }
            }
        }, { new: true, runValidators: true });
        return res.status(200).json({ message: "Updated Successfully", success: true, seller });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/seller/view/:sellerId
export const sellerView = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
        const products = await productModel.find({ sellerId });
        if (products) {
            return res.status(200).json({ message: "Products Fetched", success: true, products });
        } else {
            return res.status(201).json({ message: "No Products found", success: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
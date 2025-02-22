import bcryptjs from "bcryptjs";
import userModel from "../models/userModel.js";

//route  api/v1/user/sign-in
export const userSignIn = async (req, res, next) => {
    try {
        const { name, phone, email, password } = req.body.userDetails;
        if (!name || !phone || !email || !password) {
            return res.status(401).json({ message: "required field missing", success: false });
        }
        const user = await userModel.findOne({ $or: [{ phone, email }] });
        if (user) {
            return res.status(201).json({ message: "User already exist with this email or phone", success: false });
        } else {
            const encriptedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
            const newUser = await userModel.create({ name, phone, email, password: encriptedPassword });
            return res.status(200).json({ message: `Welcome to Pick&Go ${name}`, id: newUser._id, success: true });
        }
    } catch (err) {
        console.log(err.message)
        if (err.name === "MongoServerError")
            return res.status(201).json({ message: "phone number or email already exist", success: false });
        return res.status(500).json({ message: "Internal Server error", success: false });
    }
}

//route api/v1/user/sign-out
export const userSignOut = async (req, res, next) => {
    try {
        const { phone, email, password } = req.body.userDetails;
        if (!phone || !email || !password) {
            return res.status(401).json({ message: "required field missing", success: false });
        }
        const user = await userModel.findOne({ $and: [{ phone, email }] });
        if (user) {
            if (bcryptjs.compareSync(password, user.password)) {
                const deleteStatus = await userModel.findOneAndDelete({ _id: user._id });
                return res.status(200).json({ message: "Successfully Sign-out", success: true });
            } else {
                return res.status(201).json({ message: "Incorrect Password", success: false });
            }

        } else {
            return res.status(200).json({ message: "Incorrect email or phone number", success: false });
        }
    } catch (err) {
        console.log(err.message)
        if (err.name === "MongoServerError")
            return res.status(201).json({ message: "Incorrect email or phone number", success: false });
        return res.status(500).json({ message: "Internal Server error", success: false });
    }
}

//route  api/v1/user/log-in
export const userLogIn = async (req, res, next) => {
    try {
        const { phone, password } = req.body.userDetails;
        if (!phone || !password) {
            return res.status(400).json({ message: "required field missing", success: false });
        }
        const user = await userModel.findOne({ phone });
        if (user) {
            if (bcryptjs.compareSync(password, user.password)) {
                return res.status(200).json({ message: `Welcome Again ${user.name}`, id: user._id, userName: user.name, success: true });
            } else {
                return res.status(201).json({ message: "Incorrect Password", success: false });
            }
        } else {
            return res.status(201).json({ message: "No user found", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal server Error", success: false });
    }
}

//route  api/v1/user/log-out
export const userLogOut = async (req, res, next) => {
    try {
        const { phone, password } = req.body.userDetails;
        if (!phone || !password) {
            return res.status(400).json({ message: "required field missing", success: false });
        }
        const user = await userModel.findOne({ phone });
        if (user) {
            if (bcryptjs.compareSync(password, user.password)) {
                return res.status(200).json({ message: `Successfully Log-out`, success: true });
            } else {
                return res.status(201).json({ message: "Incorrect Password", success: false });
            }
        } else {
            return res.status(201).json({ message: "No user found with that phone number", success: false });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal server Error", success: false });
    }
}
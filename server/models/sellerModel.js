import mongoose from "mongoose";

const sellerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    business: {
        businessName: { type: String, required: true },
        businessAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: Number, required: true }
        },
        businessType: { type: String, required: true },
        taxId: { type: String, required: true }
    }
}, { timestamps: true });

const sellerModel = mongoose.model("Seller", sellerSchema);

export default sellerModel;
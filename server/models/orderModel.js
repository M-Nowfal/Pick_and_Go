import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: {
        type: [{
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true}
        }]
    },
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentInfo: {
        method: { type: String, enum: ["COD", "Online"], required: true },
        status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
        transactionId: { type: String, default: null }
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    deliveredAt: {
        type: Date
    }
}, { timestamps: true });

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
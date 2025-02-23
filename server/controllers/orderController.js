import orderModel from "../models/orderModel.js";

// //route api/v1/order/:userId
export const placeOrder = async (req, res, next) => {
    try {
        const { userId, orderDetails, orderdProducts } = req.body;

        const products = await Promise.all(orderdProducts.pId.map(async (productId, index) => {
            return {
                productId,
                quantity: orderdProducts.qty[index],
                price: orderdProducts.price[index]
            };
        }));

        const totalAmount = products.reduce((total, item) => total + (item.quantity * item.price), 0);

        const newOrder = new orderModel({
            userId,
            products,
            totalAmount,
            shippingAddress: {
                fullName: orderDetails.name,
                phone: orderDetails.phone,
                address: orderDetails.address,
                city: orderDetails.city,
                postalCode: orderDetails.postalCode,
                country: orderDetails.country
            },
            paymentInfo: {
                method: orderDetails.paymentMethod,
                status: orderDetails.paymentMethod === "COD" ? "Unpaid" : "Paid",
                transactionId: orderDetails.payOnline !== "COD" ? "Generated_Transaction_ID" : null
            }
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, message: "Order placed successfully!", order: savedOrder });

    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({ success: false, message: "Order failed", error: error.message });
    }
}

export const getOrders = (req, res, next) => {
    try {
        res.json({message: "Orders page is under development"});
    } catch (err) {

    }
}
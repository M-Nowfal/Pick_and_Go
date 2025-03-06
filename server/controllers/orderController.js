import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

//route api/v1/order/:userId
export const placeOrder = async (req, res, next) => {
    try {
        const { userId, orderDetails, orderdProducts, single } = req.body;
        let products;
        let totalAmount;

        if (!single) {
            products = await Promise.all(orderdProducts.pId.map(async (productId, index) => {
                return {
                    productId,
                    quantity: orderdProducts.qty[index],
                    price: orderdProducts.price[index]
                };
            }));
            totalAmount = products.reduce((total, item) => total + (item.quantity * item.price), 0);
        } else {
            products = [{
                productId: orderdProducts.pId,
                quantity: orderdProducts.qty,
                price: orderdProducts.price
            }];
            totalAmount = orderdProducts.price;
        }

        const newOrder = new orderModel({
            userId,
            products,
            totalAmount,
            shippingAddress: {
                fullName: orderDetails.name,
                phone: orderDetails.phone,
                address: orderDetails.address,
                state: orderDetails.state,
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

        await Promise.all(savedOrder.products.map(async (item) => {
            await productModel.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: -item.quantity } },
                { new: true }
            );
        }));

        res.status(201).json({ success: true, message: "Order placed successfully!", order: savedOrder });

    } catch (err) {
        console.error("Order Placement Error:", err);
        res.status(500).json({ success: false, message: "Order failed" });
    }
};


export const getOrders = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const order = await orderModel.find({ userId }).populate("products.productId");
        if (order) {
            if (order.length) {
                return res.status(200).json({ message: "Ordered Products", success: true, orders: order, moreThanOne: true });
            } else {
                return res.status(200).json({ message: "Ordered Products", success: true, orders: order, moreThanOne: false });
            }
        } else {
            return res.status(201).json({ message: "No Ordered Products", success: false, orders: null });
        }
    } catch (err) {
        console.error("Order Placement Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const deleteOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        await orderModel.findByIdAndDelete(orderId);
        return res.status(200).json({ message: "Order Deleted", success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

//route api/v1/seller/get-orders/:sellerId
export const getSellerOrders = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
        const orders = await orderModel.find({})
            .populate({
                path: "products.productId",
                select: "sellerId name"
            });
        const filteredOrders = orders.filter(order =>
            order.products.some(product =>
                product.productId?.sellerId?.toString() === sellerId
            )
        );
        return res.status(200).json({ success: true, orders: filteredOrders });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
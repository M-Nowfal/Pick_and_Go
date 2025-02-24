import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "sonner";
import OrderCard from './order/OrderCard';
import Loader from "./Loader";

const OrderPage = () => {

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/get-orders/${localStorage.getItem("userId")}`)
            .then(response => {
                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(err => toast.error("API Error"));
    }, [])

    return (
        !orders ? <Loader /> : <div className="container ordered-product-container">
            <p className="fs-3 text-secondary">{orders.createdAt.substring(0, 10)}</p>
            <div className="row ordered-products">
                <p className="fs-1 text-success fw-bold">Ordered Products</p>
                {orders.products.map(item =>
                    <OrderCard
                        key={item.productId._id}
                        name={item.productId.name}
                        description={item.productId.description}
                        price={item.productId.price}
                        image={item.productId.images[0]}
                        id={item.productId._id}
                    />)}
            </div>
            <div className="row mt-5 m-3 order-address-container">
                <p className="text-success fw-bold fs-1">Delivery Address</p>
                <div className="bg-light shadow address-container">
                    <p className="text-black fw-bold fs-2">{orders.shippingAddress.fullName}</p>
                    <p className="text-dark fw-bold fs-3">{orders.shippingAddress.phone}</p>
                    <p className="text-secondary fs-4">{orders.shippingAddress.address}</p>
                    <p className="text-dark fs-6">{orders.shippingAddress.city}</p>
                    <p className="text-dark fs-6">{orders.shippingAddress.postalCode}</p>
                    <p className="text-dark fs-6">{orders.shippingAddress.country}</p>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <div className="row mt-5 m-5 order-total">
                    <p className="fs-1 text-primary text-end">Total Amount <span className="text-dark fw-bold"><sup className="text-danger">₹</sup>{orders.totalAmount}</span></p>
                </div>
            </div>
        </div>
    );
}

export default OrderPage;
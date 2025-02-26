import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "sonner";
import OrderedItems from './order/OrderedItems';

const OrderPage = () => {

    const [orders, setOrders] = useState(null);
    const [reloadOrders, setReloadOrders] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/get-orders/${localStorage.getItem("userId")}`)
            .then(response => {
                if (response.data.success) {
                    if (response.data.moreThanOne) {
                        setOrders(response.data.orders);
                    } else {
                        setOrders([response.data.orders]);
                    }
                } else {
                    toast.error(response.data.message);
                    setOrders(response.data.orders);
                }
            })
            .catch(err => toast.error("API Error"));
    }, [reloadOrders]);

    return (
        localStorage.getItem("userName") && <div className="ordered-product-container">
            {orders?.slice().reverse().map((item, index) =>
            item && item._id ? (
                <OrderedItems
                    key={item._id}
                    orders={item}
                    reloadOrders={reloadOrders}
                    setReloadOrders={setReloadOrders}
                />
            ) : (
                <div key={index} className="fs-4 text-black fw-bold">No Orders</div>
            ))}
        </div>
    );
}

export default OrderPage;
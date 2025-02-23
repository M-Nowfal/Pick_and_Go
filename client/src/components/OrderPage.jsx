import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "sonner";
import { Link } from 'react-router-dom';

const OrderPage = () => {

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/get-orders/${localStorage.getItem("userId")}`)
        .then(response => {
            // setOrders();
            toast.success(response.data.message);
        })
        .catch(err => toast.error("API Error"));
    },[])

    return (
        <div className="page-not-found">
            <div className="content">
                <h1 className="">Order Page is Under development</h1>
                <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
            </div>
        </div>
    );
}

export default OrderPage;
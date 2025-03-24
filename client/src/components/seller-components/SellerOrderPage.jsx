import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import SellerOrder from './SellerOrder';
import Loader from '../Loader';

const SellerOrderPage = () => {

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/seller/get-orders/${localStorage.getItem("sellerId")}`)
        .then(response => {
            if(response.data.success){
                setOrders(response.data.orders);
            }else{
                toast.error(response.data.message);
            }
        })
        .catch(err => {
            console.log(err.message);
            toast.error("Something went wrong, please try again later");
        })
    },[]);

    return (
        !orders ? <Loader /> : <div className="container">
            <div className="row">
                <SellerOrder orders={orders} />
            </div>
        </div>
    );
}

export default SellerOrderPage;

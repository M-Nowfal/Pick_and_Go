import React, { useState } from 'react';
import OrderCard from './OrderCard';
import axios from 'axios';
import { toast } from 'sonner';

const OrderedItems = ({ orders, reloadOrders, setReloadOrders }) => {

    const [visibleAddress, setVisibleAddress] = useState(false);
    const months = [
        "Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    function deleteOrder(orderId) {
        const confirmDelete = confirm("Are you Sure to delete");
        if (confirmDelete) {
            axios.delete(`${import.meta.env.VITE_API_URL}/delete-order/${orderId}`)
                .then(response => {
                    if (response.data.success) {
                        toast.success(response.data.message);
                        setReloadOrders(!reloadOrders);
                    } else {
                        toast.success(response.data.message);
                    }
                })
                .catch(err => console.log(err.message));
        } else {
            console.log("NO");
        }
    }

    return (
        <div className="container">
            <div className="row ordered-products text-center m-2">
                <div className="d-flex bg-secondary rounded">
                    <div className="col-6 col-md-4">
                        <div className="fs-4 text-white fw-bold">ORDER PLACED</div>
                        <div className="fs-6 fw-bold text-white">{orders.createdAt.substring(8, 10)}-{months[Number(orders.createdAt.substring(5, 7) - 1)]}-{orders.createdAt.substring(0, 4)}</div>
                    </div>
                    <div className="col-6 col-md-4">
                        <div className="fs-4 text-white fw-bold">TOTAL</div>
                        <div className="fs-6 fw-bold text-white">{orders.totalAmount}</div>
                    </div>
                    <div className="d-none d-md-block col-md-4">
                        <div className="fs-4 text-white fw-bold">SHIP TO</div>
                        <div className="fs-6 fw-bold text-white cursor" onClick={() => setVisibleAddress(!visibleAddress)}>
                            <span className="text-info">{orders.shippingAddress.fullName}</span>&nbsp;
                            <i className="fa-solid fa-chevron-down" />
                        </div>
                    </div>
                    {visibleAddress && <div className="position-relative d-none d-md-block">
                        <div className="bg-light address-container-visible">
                            <div className="text-black fw-bold fs-5">{orders.shippingAddress.fullName}</div>
                            <div className="text-secondary fs-6">{orders.shippingAddress.address}</div>
                            <div className="text-dark fs-6">{orders.shippingAddress.state}</div>
                            <div className="text-dark fs-6">{orders.shippingAddress.postalCode}</div>
                            <div className="text-dark fs-6">{orders.shippingAddress.country}</div>
                        </div>
                    </div>}
                </div>
                {orders.products.map(item =>
                    <OrderCard
                        key={item.productId._id}
                        name={item.productId.name}
                        description={item.productId.description}
                        price={item.productId.price}
                        qty={item.quantity}
                        image={item.productId.images[0]}
                        id={item.productId._id}
                    />)}
            </div>
            <div className="row mt-5 m-3 order-address-container d-md-none">
                <div className="fs-4 text-success fw-bold">SHIP TO</div>
                <div className="bg-light address-container">
                    <div className="text-black fw-bold fs-5">{orders.shippingAddress.fullName}</div>
                    <div className="text-secondary fs-6">{orders.shippingAddress.address}</div>
                    <div className="text-dark fs-6">{orders.shippingAddress.state}</div>
                    <div className="text-dark fs-6">{orders.shippingAddress.postalCode}</div>
                    <div className="text-dark fs-6">{orders.shippingAddress.country}</div>
                </div>
            </div>
            <div className="text-center">
                <button className="btn btn-outline-danger w-50" onClick={() => deleteOrder(orders._id)}>Cancel Order</button>
            </div>
            <hr />
        </div>
    );
}

export default OrderedItems;
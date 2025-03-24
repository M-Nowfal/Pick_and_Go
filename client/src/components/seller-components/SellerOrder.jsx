import React from 'react';

const SellerOrder = ({ orders }) => {
    if (!orders || orders.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h4 className="fw-bold fs-2">No Orders Found</h4>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-5">
            <h2 className="mb-4">Orders</h2>
            <div className="row">
                {orders.map(order => (
                    <div key={order._id} className="col-md-6 mb-4">
                        <div className="card shadow-sm p-3">
                            <h5 className="mb-2">Order ID: {order._id}</h5>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                            <p><strong>Payment:</strong> {order.paymentInfo.method} ({order.paymentInfo.status})</p>
                            <hr />
                            <h6>Shipping Address:</h6>
                            <p>{order.shippingAddress.fullName}, {order.shippingAddress.phone}</p>
                            <p>{order.shippingAddress.address}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.postalCode}</p>
                            <hr />
                            <h6>Products:</h6>
                            {order.products.map(product => (
                                <div key={product.productId._id} className="mb-3">
                                    <p><strong>{product.productId.name}</strong></p>
                                    <p>Quantity: {product.quantity} | Price: ₹{product.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellerOrder;

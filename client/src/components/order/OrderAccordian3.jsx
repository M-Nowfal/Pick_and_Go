import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { context } from '../../App';

const OrderAccordian3 = ({ orderDetails, handleOrderDetails, totalAmt, orderProducts, single }) => {

    const navigate = useNavigate();
    const [orderdProducts, setOrderdProducts] = useState(null);
    const { cartItemsOrdered, setCartItemsOrdered, setTotalItems, setTryingToOrder } = useContext(context);

    function placeOrder() {
        setTryingToOrder(false);
        if (single) {
            setOrderdProducts({ pId: orderProducts.productId._id, qty: orderProducts.quantity, price: orderProducts.productId.price * orderProducts.quantity });
        } else {
            setOrderdProducts({
                pId: orderProducts.cartItems.map(item => item.productId._id),
                qty: orderProducts.cartItems.map(item => item.quantity),
                price: orderProducts.cartItems.map(item => item.productId.price)
            });
            if (cartItemsOrdered) {
                axios.delete(`${import.meta.env.VITE_API_URL}/delete-ordered-cart/${localStorage.getItem("userId")}`)
                    .then(response => {
                        if (response.data.success) {
                            toast.success(response.data.message);
                            setCartItemsOrdered(false);
                            setTotalItems(0);
                        } else {
                            toast.error(response.data.message);
                        }
                    })
                    .catch(err => console.log(err.message));
            }
        }
    }

    useEffect(() => {
        orderdProducts && axios.post(`${import.meta.env.VITE_API_URL}/order`, { userId: localStorage.getItem("userId"), orderDetails, orderdProducts, single })
            .then(response => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate('/');
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(err => {
                toast.error("Something went wrong please contact the developer with ERROR CODE 104");
                console.log(err.message);
            });
    }, [orderdProducts])

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Payment
                </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <div className="payment-container">
                        <h3 className="text-center mb-4">💳 Choose Payment Method</h3>
                        <div className="payment-option">
                            <label className="fw-bold" htmlFor="payment-method">Payment Method:</label>
                            <select
                                id="payment-method"
                                className="form-select mt-2"
                                value={orderDetails.paymentMethod}
                                onChange={(e) => handleOrderDetails("paymentMethod", e.target.value)}
                            >
                                <option value="COD">🚚 Cash on Delivery</option>
                                <option value="Online">💳 Online Payment</option>
                            </select>
                        </div>
                        {orderDetails.paymentMethod === "Online" && (
                            <div className="payment-option">
                                <label className="fw-bold" htmlFor="online-pay-method">Select Online Payment:</label>
                                <select
                                    id="online-pay-method"
                                    className="form-select mt-2"
                                    value={orderDetails.payOnline}
                                    onChange={(e) => handleOrderDetails("payOnline", e.target.value)}
                                >
                                    <option value="GPay"> Google Pay</option>
                                    <option value="Paytm"> Paytm</option>
                                    <option value="Other"> Other</option>
                                </select>
                            </div>
                        )}
                        <div className="total-price-box text-center mt-4">
                            <h4>🚚 Shipping Charge: <span className="fs-6">{(totalAmt > 499) ? "Eligible for Free Shipping" : "₹40"}</span></h4>
                            <h4>🛒 Total Price: <span className="price">₹{(totalAmt > 499) ? totalAmt : totalAmt + 40}</span></h4>
                        </div>
                        <div className="text-center mt-3">
                            <button
                                className="btn btn-success pay-btn"
                                data-bs-toggle="collapse"
                                data-bs-target={(!orderDetails.name || !orderDetails.phone || !orderDetails.address || !orderDetails.state || !orderDetails.postalCode || !orderDetails.country || orderDetails.phone.length !== 10) ? "#collapseTwo" : null}
                                onClick={() => {
                                    if (!(!orderDetails.name || !orderDetails.phone || !orderDetails.address || !orderDetails.state || !orderDetails.postalCode || !orderDetails.country || orderDetails.phone.length !== 10)) {
                                        placeOrder();
                                    }
                                }}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderAccordian3;
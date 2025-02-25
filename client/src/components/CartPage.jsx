import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { toast } from "sonner";
import axios from "axios";
import Loader from "./Loader";
import { context } from "../App";
import "../styles/cartPage.css";

const CartPage = ({ render, setRender }) => {

    const { totalItems, setTotalItems, currentUserId, setCartItemsOrdered } = useContext(context);
    const [cart, setCart] = useState(null);
    const [totalAmt, setTotalAmt] = useState(0);
    const [localCart, setLocalCart] = useState({ id: null, ope: null, isDel: null });
    const { userId } = useParams();
    const [permisible, setPermisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + `/cart-items/${userId}`)
        .then(response => {
            const data = response.data;
            if (data.success && data.cart && data.cart.cartItems) {
                setCart(data.cart);
                const total = data.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
                setTotalItems(total);
                const amt = data.cart.cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
                setTotalAmt(amt);
            } else {
                setCart({ cartItems: [] });
                toast.error(response.data.message);
            }
        }).catch((err) => {
            toast.error(err.message)
            setCart({ cartItems: [] });
        });
    }, []);

    useEffect(() => {
        if (cart && localCart.id) {
            const updatedCart = cart.cartItems.find(item => item._id == localCart.id);
            setTotalAmt((localCart.ope) ? totalAmt + updatedCart.productId.price : totalAmt - updatedCart.productId.price);
            if (localCart.isDel) {
                const newCart = cart.cartItems.filter(item => item._id != localCart.id);
                setCart({ cartItems: newCart });
            }
            if (updatedCart) {
                setTotalItems(localCart.ope ? totalItems + 1 : totalItems - 1);
            }
        }
    }, [render]);

    return (
        !cart ? <Loader /> : <div className="container mt-5 pt-5 text-center">
            <h2 className="mt-5">
                {
                    (totalItems == 0) ?
                        <div className="cart-title">
                            <h1 className="m-2">Your Pick&Go Cart Empty</h1>
                            <Link to="/" className="btn btn-primary m-2">Go to Home</Link>
                        </div>
                        :
                        "Cart Items"
                }
            </h2>
            <div className="row">
                <div className="col-12 col-lg-9">
                    <div className="">
                        {cart && cart.cartItems.map((item) => (
                            <CartItem key={item._id}
                                item={item}
                                setCart={setCart}
                                setRender={setRender}
                                render={render}
                                setLocalCart={setLocalCart}
                                permisible={permisible}
                                setPermisible={setPermisible}
                            />
                        ))}
                    </div>
                </div>
                {
                    totalAmt > 0 && <div className="col-12 col-lg-6 order-summary justify-content-center my-5">
                        <h3 className="text-success">Order Summary</h3>
                        <h5>Total Items <span className="text-danger fw-bold fs-4">&nbsp;{totalItems}</span></h5>
                        <h5>Total Amount&nbsp; <sup className="text-secondary fs-5">₹</sup><span className="text-primary fw-bold fs-3">{totalAmt}</span></h5>
                        <button className="btn btn-warning mt-2 shadow" onClick={() => {
                            navigate('/orders/?single=false');
                            window.scrollTo({top:0});
                            setCartItemsOrdered(true);
                        }}>Proceed to Buy ({totalItems} items)</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default CartPage;
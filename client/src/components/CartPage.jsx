import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartItem from "./CartItem";
import { toast } from "sonner";

const CartPage = ({ totalItems, setTotalItems, render, setRender}) => {
    const [cart, setCart] = useState(null);
    const [totalAmt, setTotalAmt] = useState(0);
    const { userId } = useParams();

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + `/cart-items/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                if(data.status){
                    setCart(data.cart);
                    const total = data.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
                    setTotalItems(total);
                    const amt = data.cart.cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
                    setTotalAmt(amt);
                }else {
                    toast.error("Empty Cart");
                }
            })  
            .catch((err) => console.error(err));
    }, [render]);

    if (!cart) {
        return (
            <div>
                <h1 className="d-flex justify-content-center align-items-center h-100 text-dark">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-3 text-center">
            <h2 className="mt-5">{(totalItems == 0) ? "Empty Cart" : "Cart Items"}</h2>
            <div className="row">
                <div className="col-12 col-lg-9">
                    <div className="cart-items">
                        {cart.cartItems.map((item) => (
                            <CartItem key={item._id} 
                                item={item} 
                                setCart={setCart} 
                                setRender={setRender} 
                                render={render} 
                            />
                        ))}
                    </div>
                </div>
                { totalAmt > 0 && <div className="col-12 order-summary my-5">
                    <h3 className="text-success">Order Summary</h3>
                    <h5>Total Items <span className="text-danger fw-bold fs-4">&nbsp;{totalItems}</span></h5>
                    <h5>Total Amount&nbsp; <sup className="text-secondary fs-5">₹</sup><span className="text-primary fw-bold fs-3">{totalAmt}</span></h5>
                    <button className="btn btn-warning mt-2 shadow">Proceed to Buy ({totalItems} items)</button>
                </div>
                }
            </div>
        </div>
    );
};

export default CartPage;

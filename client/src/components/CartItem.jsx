import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CartItem = ({ item, setCart, setRender, render, setLocalCart }) => {

    const [permisible, setPermisible] = useState(true);
    const [count, setCount] = useState(item.quantity);

    const updateCart = (operation) => {
        axios.put(import.meta.env.VITE_API_URL + `/update-cart-qty?userId=${import.meta.env.VITE_USER}&id=${item._id}&ope=${operation}`)
            .then(response => {
                if (response.data.success) {
                    setCart(response.data.newCart);
                    setRender(!render);
                    setPermisible(true);
                }
            })
            .catch((err) => toast.error("API Error"));
    };

    const deleteCart = (id) => {
        axios.delete(import.meta.env.VITE_API_URL + `/delete-cart/${import.meta.env.VITE_USER}/${id}`)
            .then(response => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    setRender(!render);
                    setPermisible(true);
                } else {
                    toast.success("Something gone wrong please try again later");
                }
            })
            .catch(err => console.log("Error while deleting Cart"));

    }

    if (!item) {
        return (
            <div>
                <h1 className="d-flex justify-content-center align-items-center h-100 text-dark">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="card text-center shadow my-3">
            <div className="row pb-3">
                <div className="col-6 text-center my-auto">
                    <Link to={`/product-details/${item.productId._id}`} className="text-decoration-none">
                        <img src={item.productId.images[0]} alt={item.productId.name} className="card-img-top cart-image" />
                    </Link>
                    <h2>
                        <sup className="text-danger">₹</sup>
                        {item.productId.price}
                    </h2>
                </div>
                <div className="col-6 my-auto pt-2">
                    <h4 className="text-info">{item.productId.name}</h4>
                    <h6>Brand: {item.productId.brand}</h6>
                    <p className="d-none d-lg-block">{item.productId.description}</p>
                    <p className="text-secondary">
                        Quantity: <span className="text-primary fw-bold">{count}</span>
                    </p>
                    <div className="w-75 mx-auto">
                        {
                            (count == 1 && permisible) ? 
                            <button className="inc-dec-btn" disabled={!permisible}>
                                <i className={`fa-solid fa-trash-can text-dark fs-4 me-2 cursor ${(!permisible)?'opacity-25':''}`}
                                    onClick={() => {
                                        setLocalCart({ id: item._id, ope: false, isDel: true });
                                        deleteCart(item._id);
                                        setPermisible(false);
                                    }}
                                />
                            </button>
                                :
                            <button className="inc-dec-btn" disabled={!permisible}>
                                <i className={`fa-solid fa-square-minus text-danger fs-4 me-2 cursor ${(!permisible)?'opacity-25':''}`}
                                    onClick={() => {
                                        if (count > 1 && permisible) {
                                            setCount(prev => prev - 1);
                                            setLocalCart({ id: item._id, ope: false, isDel: false });
                                            updateCart("minus");
                                            setPermisible(false);
                                        }
                                    }}
                                />
                            </button>
                        }
                        <button className="rounded pb-3 btn">{count}</button>
                        <button className="inc-dec-btn" disabled={!permisible}>
                            <i
                                className={`fa-solid fa-square-plus text-success fs-4 ms-2 cursor disabled ${(!permisible)?'opacity-25':''}`}
                                onClick={() => {
                                    if (count < item.productId.stock && permisible) {
                                        setCount(prev => prev + 1);
                                        setLocalCart({ id: item._id, ope: true, isDel: false });
                                        updateCart("plus");
                                        setPermisible(false);
                                    }
                                }}
                            ></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
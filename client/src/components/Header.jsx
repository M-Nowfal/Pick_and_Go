import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ totalItems }) => {

    const [total, setTotal] = useState(totalItems);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + `/cart-items/${import.meta.env.VITE_USER}`)
            .then((res) => res.json())
            .then((data) => {
                if(data.status){
                    const totalItem = data.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
                    setTotal(totalItem);
                }
            })  
            .catch((err) => console.error(err));
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid d-flex align-items-center">

                <div className="toggle-bar me-3" data-bs-toggle="offcanvas" data-bs-target="#slider" aria-controls="slider">
                    <i className="fa-solid fa-bars text-warning fs-3"></i>
                </div>

                <Link className="navbar-brand me-3" to="/">
                    <img src="/Pick&Go.png" alt="pick_and_go Logo" className="pick_and_go-logo" />
                </Link>

                <div className="search-bar flex-grow-1 mx-3">
                    <div className="input-group">
                        <select className="form-select category-dropdown rounded-start" id="category">
                            <option>All</option>
                            <option>Electronics</option>
                            <option>Mobiles</option>
                            <option>Dresses</option>
                        </select>
                        <input type="text" className="form-control" id="search-product" placeholder="Search Product" />
                        <button className="btn btn-warning  rounded-end">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>

                <div className="nav-item me-4 d-lg-block current-login">
                    <p className="m-0 text-white fw-bold">Accounts & Lists</p>
                </div>

                <div className="nav-item me-4 d-none d-lg-block">
                    <p className="m-0 text-white fw-bold">Orders</p>
                </div>

                <Link to={`/cart/${import.meta.env.VITE_USER}`} className="text-decoration-none">
                    <div className="nav-item cart">
                        <i className="fas fa-shopping-cart text-white fs-4"></i>
                        <span className="text-warning fw-bold ms-1">Cart<span className="badge badge-light bg-warning">{(totalItems == 0) ? total : totalItems}</span></span>
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Header;

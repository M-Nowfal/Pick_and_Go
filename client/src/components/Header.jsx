import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../App";
import { toast } from "sonner";
import "../styles/header.css";
import axios from "axios";

const Header = ({ currentUser }) => {

    const navigate = useNavigate();
    const { totalItems, setTotalItems, currentUserId, setCurrentUser } = useContext(context);
    const [searchProduct, setSearchProduct] = useState("");

    useEffect(() => {
        localStorage.getItem("userId") && axios.get(import.meta.env.VITE_API_URL + `/cart-items/${localStorage.getItem("userId")}`)
            .then(response => {
                const data = response.data;
                if (data.success && data.cart && data.cart.cartItems) {
                    const total = data.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
                    setTotalItems(total);
                }
            }).catch((err) => {
                console.log(err.message);
                toast.error("Error While fetching Cart Items");
            });
    }, [currentUserId]);

    function clearSession() {
        if (searchProduct == "clear") {
            localStorage.clear();
            setCurrentUser(null);
            navigate('/');
        } else if (searchProduct == import.meta.env.VITE_ADMIN_LOGIN) {
            localStorage.getItem("admin") ? navigate('/admin/logout') : navigate('/admin/login');
        } else if (searchProduct == import.meta.env.VITE_ADMIN_CREATE) {
            localStorage.getItem("admin") ? null : navigate('/admin/creation');
        }
        setSearchProduct("");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid d-flex align-items-center">

                <div className="toggle-bar mt-1 me-3" data-bs-toggle="offcanvas" data-bs-target="#slider" aria-controls="slider">
                    <i className="fa-solid fa-bars text-warning fs-3"></i>
                </div>

                <Link className="navbar-brand me-3" to="/">
                    <img src="/Pick&Go.png" alt="pick_and_go Logo" className="pick_and_go-logo" title="Pick&Go" />
                </Link>

                <div className="search-bar flex-grow-1 mx-3">
                    <div className="input-group">
                        <select className="form-select category-dropdown rounded-start" id="category">
                            <option>All</option>
                            <option>Mobiles</option>
                            <option>Laptops</option>
                            <option>Dresses</option>
                        </select>
                        <input type="text" className="form-control" id="search-product" value={searchProduct} placeholder="Search Product" onChange={(e) => setSearchProduct(e.target.value)} />
                        <button className="btn btn-warning  rounded-end" onClick={clearSession}>
                            <i className="fas fa-search" title="Search Products"></i>
                        </button>
                    </div>
                </div>

                <div className="nav-item me-4 d-lg-block current-login d-flex" onClick={() => !currentUser ? navigate('/user/login') : navigate('/getUser')} title="Accounts">
                    <i className="fa-solid fa-user-tie text-white fs-4" />&nbsp;&nbsp;
                    <p className="m-0 text-white fw-bold">{(currentUser) ? currentUser : "Accounts"}</p>
                </div>

                <div className="nav-item me-4 d-none d-lg-block" title="Orders">
                    <p className="m-0 text-white fw-bold" onClick={() => { localStorage.getItem("sellerId") ? navigate('/seller/orderpage') : localStorage.getItem("userId") ? navigate('/order-page') : navigate('/user/login') }}>Orders</p>
                </div>

                {localStorage.getItem("userId") && <Link to={(currentUserId) ? `/cart/${currentUserId}` : "/user/login"} className="text-decoration-none" onClick={() => { (currentUserId) ? null : toast.error("Log in to See Cart Items") }}>
                    <div className="cart-container" title="Cart">
                        <div className="nav-item cart">
                            <i className="fas fa-shopping-cart text-white fs-4"></i>
                            <span className="total-cart-item badge bg-warning text-black fw-bold">{totalItems}</span>
                        </div>
                    </div>
                </Link>}
            </div>
        </nav>
    );
};

export default Header;
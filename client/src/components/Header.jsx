import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../App";

const Header = () => {

    const navigate = useNavigate();
    const { totalItems, setTotalItems } = useContext(context);

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
                            <option>Mobiles</option>
                            <option>Laptops</option>
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
                    <p className="m-0 text-white fw-bold" onClick={() => navigate('/orders')}>Orders</p>
                </div>

                <Link to={`/cart/${import.meta.env.VITE_USER}`} className="text-decoration-none">
                    <div className="p-relative cart-container">
                        <div className="nav-item cart">
                            <i className="fas fa-shopping-cart text-white fs-4"></i>
                            <span className="text-warning fw-bold ms-1">Cart<span className="badge badge-light bg-warning">{totalItems}</span></span>
                        </div>
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Header;

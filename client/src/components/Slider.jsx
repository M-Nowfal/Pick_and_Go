import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../App';
import { toast } from 'sonner';

const Slider = ({ currentUser }) => {

    const { currentUserId, setCategory } = useContext(context);
    const navigate = useNavigate();

    return (
        <div className="offcanvas offcanvas-start bg-light" data-bs-scroll="true" tabIndex="-1" id="slider" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header bg-dark">
                <i className="fa-solid fa-user-tie text-white fs-4" />&nbsp;&nbsp;
                <h5 className="offcanvas-title session-loged-in fs-3 text-warning" id="offcanvasExampleLabel">{(currentUserId) ? currentUser : "Guest"}</h5>
                <button type="button" className="btn-close text-reset text-bg-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <h6 className="fs-5 fw-bold">Shop by Department</h6>
                <ul className="list-unstyled p-2" data-bs-dismiss="offcanvas">
                    <li className="list-element" onClick={() => setCategory("mobile")}>Mobiles</li>
                    <li className="list-element" onClick={() => setCategory("laptop")}>Laptops</li>
                    <li className="list-element" onClick={() => setCategory("other")}>Others</li>
                    <li className="list-element" onClick={() => setCategory("all")}>All</li>
                </ul>
                <hr />
                {localStorage.getItem("userId") ? <h6 className="fs-5 fw-bold">Orders & Carts</h6> : <h6 className="fs-5 fw-bold">Products & Orders</h6>}
                <ul className="list-unstyled p-2" data-bs-dismiss="offcanvas">
                    {localStorage.getItem("sellerId") ? (
                        <li className="list-element" onClick={() => { (currentUserId) ? navigate(`/seller/viewpage`) : (navigate(`/seller/login`), toast.error("Login to See Seller Products")) }}>
                            Products
                        </li>
                    ) : (<li className="list-element" onClick={() => { (currentUserId) ? navigate(`/cart/${currentUserId}`) : (navigate(`/user/login`), toast.error("Login to See Cart Items")) }}>
                        Carts
                    </li>)}
                    <li className="list-element" onClick={() => { (localStorage.getItem("userId")) ? navigate('/order-page') : localStorage.getItem("sellerId") ? navigate('/seller/orderpage') : (navigate('/user/login'), toast.error("Login to See Orders")) }}>
                        Orders
                    </li>
                </ul>
                <hr />
                <h6 className="fs-5 fw-bold">Help & Settings</h6>
                <ul className="list-unstyled p-2" data-bs-dismiss="offcanvas">
                    <li className="list-element" onClick={() => { currentUserId ? navigate('/getUser') : (navigate('/user/login'), toast.error("Login to see account details")) }}><i className="fa-solid fa-user-tie text-secondary" /> Your Account</li>
                    <li className="list-element" onClick={() => navigate('/language')}><i className="fa-solid fa-globe text-secondary" /> English</li>
                    <li className="list-element" onClick={() => navigate('/customer-care')} >Customer Service</li>
                    {!localStorage.getItem("sellerId") && <li className="list-element" onClick={() => navigate('/seller')} >Seller</li>}
                    {!currentUserId && <li className="list-element" onClick={() => navigate('/user/login')}>Log In</li>}
                    {currentUserId && <li className="list-element" onClick={() => { localStorage.getItem("userId") ? navigate('/user/logout') : navigate('/seller/logout') }}>Log Out</li>}
                    {currentUserId && <li className="list-element" onClick={() => { localStorage.getItem("userId") ? navigate('/user/signout') : navigate('/seller/signout') }}>Sign Out</li>}
                </ul>
            </div>
        </div>
    );
}

export default Slider;
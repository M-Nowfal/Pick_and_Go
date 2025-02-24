import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../App';

const Slider = (props) => {

    const { currentUserId } = useContext(context);
    const navigate = useNavigate();

    return (
        <div className="offcanvas offcanvas-start bg-light" data-bs-scroll="true" tabIndex="-1" id="slider" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header bg-dark">
                <i className="fa-solid fa-user-tie text-white fs-4" />&nbsp;&nbsp;
                <h5 className="offcanvas-title session-loged-in fs-3 text-warning" id="offcanvasExampleLabel">{(props.currentUser)?props.currentUser:"Guest"}</h5>
                <button type="button" className="btn-close text-reset text-bg-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <h6 className="fs-5 fw-bold">Shop by Department</h6>
                <ul className="list-unstyled p-2"  data-bs-dismiss="offcanvas">
                    <li className="list-element">Mobiles</li>
                    <li className="list-element">Laptops</li>
                    <li className="list-element">Dresses</li>
                    <li className="list-element">Others</li>
                </ul>
                <hr />
                <h6 className="fs-5 fw-bold">Orders & Carts</h6>
                <ul className="list-unstyled p-2"  data-bs-dismiss="offcanvas">
                    <li className="list-element"><Link to={(currentUserId) ? `/cart/${currentUserId}` : ""}className="text-reset text-decoration-none">Carts</Link></li>
                    <li className="list-element" onClick={() => navigate('/order-page')}>Orders</li>
                </ul>
                <hr />
                <h6 className="fs-5 fw-bold">Help & Settings</h6>
                <ul className="list-unstyled p-2"  data-bs-dismiss="offcanvas">
                    <li className="list-element"><i className="fa-solid fa-user-tie text-secondary" /> Your Account</li>
                    <li className="list-element"><i className="fa-solid fa-globe text-secondary" /> English</li>
                    <li className="list-element">Customer Service</li>
                    <li className="list-element">Seller</li>
                    {!currentUserId && <li className="list-element" onClick={() => navigate('/user/login')}>Log In</li>}
                    {currentUserId && <li className="list-element" onClick={() => navigate('/user/logout')}>Log Out</li>}
                    {currentUserId && <li className="list-element" onClick={() => navigate('/user/signout')}>Sign Out</li>}
                    {/* <li className="list-element" onClick={() => {localStorage.clear(); location.reload()}}>Clear Session</li> */}
                </ul>
            </div>
        </div>
    );
}

export default Slider;
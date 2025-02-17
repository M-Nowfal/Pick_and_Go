import React from 'react';

const Slider = (props) => {
    return (
        <div className="offcanvas offcanvas-start bg-light" tabIndex="-1" id="slider" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header bg-dark">
                <i className="fa-solid fa-user-tie text-secondary fs-4"></i>&nbsp;&nbsp;
                <h5 className="offcanvas-title session-loged-in fs-3 text-warning" id="offcanvasExampleLabel">{props.name}</h5>
                <button type="button" className="btn-close text-reset text-bg-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

                <h6 className="fs-5 fw-bold">Shop by Department</h6>
                <ul className="list-unstyled p-2">
                    <li className="list-element">Mobiles</li>
                    <li className="list-element">Laptops</li>
                    <li className="list-element">Dresses</li>
                    <li className="list-element">Others</li>
                </ul>
                <hr />
                <h6 className="fs-5 fw-bold">Orders & Carts</h6>
                <ul className="list-unstyled p-2">
                    <li className="list-element">Carts</li>
                    <li className="list-element">Orders</li>
                </ul>
                <hr />
                <h6 className="fs-5 fw-bold">Help & Settings</h6>
                <ul className="list-unstyled p-2">
                    <li className="list-element"><i className="fa-solid fa-user-tie text-secondary" /> Your Account</li>
                    <li className="list-element"><i className="fa-solid fa-globe text-secondary" /> English</li>
                    <li className="list-element">Customer Service</li>
                    <li className="list-element">Sign Out</li>
                </ul>
            </div>
        </div>
    );
}

export default Slider;
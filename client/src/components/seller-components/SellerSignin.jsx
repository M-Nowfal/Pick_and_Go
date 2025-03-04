import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../../App';
import axios from 'axios';
import { toast } from 'sonner';

const SellerSignin = () => {
    const navigate = useNavigate();
    const { setCurrentUserId, setCurrentUser } = useContext(context);
    const [visible, setVisible] = useState(true);
    const [sellerDetails, setSellerDetails] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        business: {
            businessName: "",
            street: "",
            city: "",
            state: "",
            pincode: "",
            type: "",
            taxId: ""
        }
    });

    function createSeller() {
        axios.post(`${import.meta.env.VITE_API_URL}/seller/sign-in`, { sellerDetails })
            .then(response => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    localStorage.clear();
                    localStorage.setItem("sellerName", sellerDetails.name);
                    localStorage.setItem("sellerId", response.data.sellerId);
                    setCurrentUserId(localStorage.getItem("sellerId"));
                    setCurrentUser(sellerDetails.name);
                    navigate('/seller/viewpage');
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(err => console.log(err));
    }

    function handleSellerDetails(key, val) {
        setSellerDetails({ ...sellerDetails, [key]: val });
    }

    function handleBusinessDetails(key, val) {
        setSellerDetails(prev => ({
            ...prev,
            business: {
                ...prev.business,
                [key]: val
            }
        }));
    }

    return (
        <div className="container mt-3">
            <div className="row py-5 mt-5">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    createSeller();
                }}>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="col-12 col-md-6">
                            <div className="seller-form p-3 bg-dark shadow-lg text-warning">
                                <h3 className="text-center text-warning">Sign In as Seller</h3>
                                <label htmlFor="name" className="seller-label-field">Name</label>
                                <input type="text" id="name" className="seller-input-field" placeholder="Enter Name"
                                    value={sellerDetails.name}
                                    autoComplete="off"
                                    onChange={(e) => handleSellerDetails("name", e.target.value)}
                                    required
                                />

                                <label htmlFor="phone" className="seller-label-field">Phone</label>
                                <input type="number" id="phone" className="seller-input-field" placeholder="Enter Phone"
                                    value={sellerDetails.phone}
                                    autoComplete="off"
                                    onChange={(e) => handleSellerDetails("phone", e.target.value)}
                                    required
                                />

                                <label htmlFor="email" className="seller-label-field">E-mail</label>
                                <input type="email" id="email" className="seller-input-field" placeholder="Enter E-mail"
                                    value={sellerDetails.email}
                                    autoComplete="off"
                                    onChange={(e) => handleSellerDetails("email", e.target.value)}
                                    required
                                />

                                <label htmlFor="password" className="seller-label-field">Password</label>
                                <input type="password" id="password" className="seller-input-field" placeholder="Enter Password"
                                    value={sellerDetails.password}
                                    autoComplete="off"
                                    onChange={(e) => handleSellerDetails("password", e.target.value)}
                                    required
                                />
                                <h6 className="text-center text-warning m-2" onClick={() => setVisible(!visible)}>Business Details <i className={`fa-solid fa-chevron-${visible ? 'down' : 'up'} text-danger`} /></h6>
                                <div className={`business-container ${visible ? "d-none" : "d-block"}`}>
                                    <label htmlFor="business-name" className="seller-label-field">Business Name</label>
                                    <input type="text" id="business-name" className="seller-input-field" placeholder="Enter your Business Name"
                                        value={sellerDetails.business.businessName}
                                        autoComplete="off"
                                        onChange={(e) => handleBusinessDetails("businessName", e.target.value)}
                                        required
                                    />
                                    <label htmlFor="street" className="seller-label-field">Street</label>
                                    <input type="text" id="street" className="seller-input-field" placeholder="Enter your Business Location Street"
                                        value={sellerDetails.business.street}
                                        autoComplete="off"
                                        onChange={(e) => handleBusinessDetails("street", e.target.value)}
                                        required
                                    />
                                    <label htmlFor="city" className="seller-label-field">City</label>
                                    <input type="text" id="city" className="seller-input-field" placeholder="Enter your Business Location City"
                                        value={sellerDetails.business.city}
                                        autoComplete="off"
                                        onChange={(e) => handleBusinessDetails("city", e.target.value)}
                                        required
                                    />
                                    <label htmlFor="state" className="seller-label-field">State</label>
                                    <input type="text" id="state" className="seller-input-field" placeholder="Enter your Business Location State"
                                        value={sellerDetails.business.state}
                                        autoComplete="off"
                                        onChange={(e) => handleBusinessDetails("state", e.target.value)}
                                        required
                                    />
                                    <label htmlFor="pincode" className="seller-label-field">Pincode</label>
                                    <input type="text" id="pincode" className="seller-input-field" placeholder="Enter your Business Location Pincode"
                                        value={sellerDetails.business.pincode}
                                        autoComplete="off"
                                        onChange={(e) => handleBusinessDetails("pincode", e.target.value)}
                                        required
                                    />
                                    <label htmlFor="type" className="seller-label-field">Business Type</label>
                                    <input type="text" id="type" className="seller-input-field" placeholder="Enter your Business Type"
                                        value={sellerDetails.business.type}
                                        autoComplete="off"
                                        onChange={(e) => handleBusinessDetails("type", e.target.value)}
                                        required
                                    />
                                    <label htmlFor="tax-id" className="seller-label-field">Tax-ID</label>
                                    <input type="text" id="tax-id" className="seller-input-field" placeholder="Enter your Business Tax-ID"
                                        value={sellerDetails.business.taxId}
                                        autoComplete="off"
                                        onChange={(e) => handleBusinessDetails("taxId", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="text-center mt-2">
                                    <button className={`btn btn-warning my-3 fw-bold ${visible ? "disabled" : ""}`}>Sign-in</button>
                                </div>
                                <Link to="/seller/login" className="text-end text-decoration-none">already have an account?</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SellerSignin;
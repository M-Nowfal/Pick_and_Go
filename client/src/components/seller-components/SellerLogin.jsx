import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { context } from '../../App';

const SellerLogin = () => {

    const navigate = useNavigate();
    const { setCurrentUser } = useContext(context);

    function handleSellerLogin() {
        axios.post(`${import.meta.env.VITE_API_URL}/seller/log-in`, { sellerDetails })
            .then(response => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    localStorage.clear();
                    localStorage.setItem("sellerName", response.data.sellerName);
                    localStorage.setItem("sellerId", response.data.sellerId);
                    setCurrentUser(response.data.sellerName);
                    navigate('/seller/viewpage');
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(err => console.log(err.message));
    }

    const [sellerDetails, setSellerDetails] = useState({
        phone: "",
        password: ""
    });

    function handleSellerDetails(key, val) {
        setSellerDetails({ ...sellerDetails, [key]: val });
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={(e) => { e.preventDefault(); handleSellerLogin() }}>
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="col-12 col-md-6">
                            <div className="user-form p-3 bg-dark shadow-lg text-warning">
                                <h3 className="text-warning text-center">Login</h3>
                                <label htmlFor="phone" className="user-label-field">Phone</label>
                                <input type="number" id="phone" className="user-input-field" placeholder="Enter Phone"
                                    name="phone"
                                    value={sellerDetails.phone}
                                    autoComplete="off"
                                    onChange={(e) => handleSellerDetails("phone", e.target.value)}
                                    required
                                />

                                <label htmlFor="password" className="user-label-field">Password</label>
                                <input type="password" id="password" className="user-input-field" placeholder="Enter Password"
                                    name="password"
                                    value={sellerDetails.password}
                                    autoComplete="off"
                                    onChange={(e) => handleSellerDetails("password", e.target.value)}
                                    required
                                />
                                <div className="text-center mt-2">
                                    <button className="btn btn-warning my-3 fw-bold">Login</button>
                                </div>
                                <Link to="/seller/signin" className="text-end text-decoration-none">don't have account?</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SellerLogin;
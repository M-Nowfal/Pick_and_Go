import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { context } from '../../App';
import axios from 'axios';
import { toast } from 'sonner';

const SellerLogout = () => {
    const navigate = useNavigate();
	const { setCurrentUserId, setCurrentUser } = useContext(context);
	const [sellerDetails, setSellerDetails] = useState({
		phone: "",
		password: ""
	});

	function handleLogout() {

		axios.get(`${import.meta.env.VITE_API_URL}/seller/log-out/${localStorage.getItem("sellerId")}/${sellerDetails.password}`)
		.then(response => {
			if(response.data.success){
				localStorage.clear();
				setCurrentUser(null);
				setCurrentUserId(null);
				toast.success(response.data.message);
				navigate('/');
			}else{
				toast.error(response.data.message);
			}
		})
		.catch(err => console.log(err.message));
	}

	function handleUserDetails(key, val) {
		setSellerDetails({ ...sellerDetails, [key]: val });
	}

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={(e) => { e.preventDefault(); handleLogout() }}>
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="col-12 col-md-6">
                            <div className="user-form p-3 bg-dark shadow-lg text-warning">
                                <h3 className="text-warning text-center">Seller Logout</h3>
                                <label htmlFor="phone" className="user-label-field">Phone</label>
                                <input type="number" id="phone" className="user-input-field" placeholder="Enter Phone"
                                    name="phone"
                                    value={sellerDetails.phone}
                                    autoComplete="off"
                                    onChange={(e) => handleUserDetails("phone", e.target.value)}
                                    required
                                />

                                <label htmlFor="password" className="user-label-field">Password</label>
                                <input type="password" id="password" className="user-input-field" placeholder="Enter Password"
                                    name="password"
                                    value={sellerDetails.password}
                                    autoComplete="off"
                                    onChange={(e) => handleUserDetails("password", e.target.value)}
                                    required
                                />
                                <div className="text-center mt-2">
                                    <button className="btn btn-warning my-3 fw-bold">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SellerLogout;
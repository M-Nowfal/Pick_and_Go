import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { context } from '../../App';
import axios from 'axios';
import { toast } from 'sonner';

const UserLogin = () => {

    const navigate = useNavigate();
    const { setCurrentUserId, setCurrentUser } = useContext(context);
    const [userDetails, setUserDetails] = useState({
        phone: "",
        password: ""
    });

    function handleLogin() {
        axios.post(import.meta.env.VITE_API_URL + `${"/user/log-in"}`, { userDetails })
        .then(response => {
            if (response.data.success) {
                toast.success(response.data.message);
                sessionStorage.setItem("userId", response.data.id);
                sessionStorage.setItem("userName", response.data.userName);
                setCurrentUser(response.data.userName);
                setCurrentUserId(response.data.id);
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        }).catch(err => toast.error(err.message));
    }

    function handleUserDetails(key, val) {
        setUserDetails({ ...userDetails, [key]: val });
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="col-12 col-md-6">
                            <div className="user-form p-3 bg-dark shadow-lg text-warning">
                                <h3 className="text-warning text-center">Login</h3>
                                <label htmlFor="phone" className="user-label-field">Phone</label>
                                <input type="number" id="phone" className="user-input-field" placeholder="Enter Phone"
                                    name="phone"
                                    value={userDetails.phone}
                                    autoComplete="off"
                                    onChange={(e) => handleUserDetails("phone", e.target.value)}
                                    required
                                />

                                <label htmlFor="password" className="user-label-field">Password</label>
                                <input type="password" id="password" className="user-input-field" placeholder="Enter Password"
                                    name="password"
                                    value={userDetails.password}
                                    autoComplete="off"
                                    onChange={(e) => handleUserDetails("password", e.target.value)}
                                    required
                                />
                                <div className="text-center mt-2">
                                    <button className="btn btn-warning my-3 fw-bold">Login</button>
                                </div>
                                <Link to="/user/signin" className="text-end text-decoration-none">don't have account?</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserLogin;
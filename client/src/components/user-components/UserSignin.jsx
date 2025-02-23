import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { context } from "../../App";

const UserSignin = () => {

    const navigate = useNavigate();
    const { setCurrentUserId, setCurrentUser } = useContext(context);
    const [userDetails, setUserDetails] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });

    function handleUserDetails(key, val) {
        setUserDetails({ ...userDetails, [key]: val });
    }

    function createUser() {
        axios.post(import.meta.env.VITE_API_URL + `${"/user/sign-in"}`, { userDetails })
        .then(response => {
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("userName", userDetails.name);
                setCurrentUser(userDetails.name);
                setCurrentUserId(response.data.id);
                navigate('/');
            } else {
                toast.success(response.data.message);
            }
        }).catch(err => toast.error(err.message));
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={(e) => { e.preventDefault(); createUser() }}>
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="col-12 col-md-6">
                            <div className="user-form p-3 bg-dark shadow-lg text-warning">
                                <h3 className="text-center text-warning">Sign In</h3>
                                <label htmlFor="name" className="user-label-field">Name</label>
                                <input type="text" id="name" className="user-input-field" placeholder="Enter Name"
                                    name="name"
                                    value={userDetails.name}
                                    autoComplete="off"
                                    onChange={(e) => handleUserDetails("name", e.target.value)}
                                    required
                                />

                                <label htmlFor="phone" className="user-label-field">Phone</label>
                                <input type="number" id="phone" className="user-input-field" placeholder="Enter Phone"
                                    name="phone"
                                    value={userDetails.phone}
                                    autoComplete="off"
                                    onChange={(e) => handleUserDetails("phone", e.target.value)}
                                    required
                                />

                                <label htmlFor="email" className="user-label-field">E-mail</label>
                                <input type="email" id="email" className="user-input-field" placeholder="Enter E-mail"
                                    name="email"
                                    value={userDetails.email}
                                    autoComplete="off"
                                    onChange={(e) => handleUserDetails("email", e.target.value)}
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
                                    <button className="btn btn-warning my-3 fw-bold">Sign-in</button>
                                </div>
                                <Link to="/user/login" className="text-end text-decoration-none">already have an account?</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserSignin;
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { context } from '../../App';

const AdminLogin = () => {

    const [details, setDetails] = useState({ phone: "", password: "" });
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(context);

    function handleAdminDetails(e) {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    async function handleAdminLogin() {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, { details });
        if(res.data.success){
            localStorage.setItem("admin", true);
            setCurrentUser("Admin");
            toast.success(res.data.message);
            navigate('/');
        }else{
            toast.error(res.data.message);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={(e) => { e.preventDefault(); handleAdminLogin() }}>
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="col-12 col-md-6">
                            <div className="user-form p-3 bg-dark shadow-lg text-warning">
                                <h3 className="text-warning text-center">Admin Login</h3>
                                <label htmlFor="phone" className="user-label-field">Phone</label>
                                <input type="number" id="phone" className="user-input-field" placeholder="Enter Phone"
                                    name="phone"
                                    value={details.phone}
                                    autoComplete="off"
                                    onChange={handleAdminDetails}
                                    required
                                />

                                <label htmlFor="password" className="user-label-field">Password</label>
                                <input type="password" id="password" className="user-input-field" placeholder="Enter Password"
                                    name="password"
                                    value={details.password}
                                    autoComplete="off"
                                    onChange={handleAdminDetails}
                                    required
                                />
                                <div className="text-center mt-2">
                                    <button className="btn btn-warning my-3 fw-bold">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
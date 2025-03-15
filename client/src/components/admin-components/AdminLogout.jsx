import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminLogout = () => {

    const [details, setDetails] = useState({ phone: "", password: "" });
    const navigate = useNavigate();

    function handleAdminDetails(e) {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    async function handleAdminLogout() {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/logout`, { details });
        if (res.data.success) {
            localStorage.removeItem("admin");
            toast.success(res.data.message);
            navigate('/');
        } else {
            toast.error(res.data.message);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={(e) => { e.preventDefault(); handleAdminLogout() }}>
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="col-12 col-md-6">
                            <div className="user-form p-3 bg-dark shadow-lg text-warning">
                                <h3 className="text-warning text-center">Admin Logout</h3>
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
                                    <button className="btn btn-warning my-3 fw-bold">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );;
}

export default AdminLogout;
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { context } from '../../App';

const AdminCreation = () => {

    const [details, setDetails] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { setCurrentUser } = useContext(context); 

    function handleAdminDetails(e) {
        setDetails({
            ...details, [e.target.name]: e.target.value
        });
    }

    async function createAdmin() {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/creation`, { details });
        if (res.data.success) {
            toast.success(res.data.message);
            setCurrentUser("Admin");
            localStorage.setItem("admin", true);
            navigate('/');
        } else {
            toast.error(res.data.message);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={(e) => { e.preventDefault(); createAdmin() }}>
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="col-12 col-md-6">
                            <div className="user-form p-3 bg-dark shadow-lg text-warning">
                                <h3 className="text-center text-warning">Admin Creation</h3>
                                <label htmlFor="name" className="user-label-field">Name</label>
                                <input type="text" id="name" className="user-input-field" placeholder="Enter Name"
                                    name="name"
                                    value={details.name}
                                    autoComplete="off"
                                    onChange={handleAdminDetails}
                                    required
                                />

                                <label htmlFor="phone" className="user-label-field">Phone</label>
                                <input type="number" id="phone" className="user-input-field" placeholder="Enter Phone"
                                    name="phone"
                                    value={details.phone}
                                    autoComplete="off"
                                    onChange={handleAdminDetails}
                                    required
                                />

                                <label htmlFor="email" className="user-label-field">E-mail</label>
                                <input type="email" id="email" className="user-input-field" placeholder="Enter E-mail"
                                    name="email"
                                    value={details.email}
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
                                    <button className="btn btn-warning my-3 fw-bold">Create Admin</button>
                                </div>
                                <Link to="/admin/login" className="text-end text-decoration-none">already have an admin account?</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminCreation;
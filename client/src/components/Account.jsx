import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import "../styles/Accounts.css";
import { context } from '../App';

const Account = () => {

    const navigate = useNavigate();
    const [editable, setEditable] = useState(false);
    const [userUpdates, setUserUpdates] = useState(null);
    const [checkPass, setCheckPass] = useState(false);
    const { setCurrentUser } = useContext(context);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/getUser/${localStorage.getItem("userId")}`)
            .then(response => {
                if (response.data.success) {
                    setUserUpdates({
                        name: response.data.user.name,
                        phone: response.data.user.phone,
                        email: response.data.user.email,
                        password: "*****"
                    }
                    );
                } else {
                    toast.error("Login");
                    navigate('/user/login');
                }
            })
            .catch(err => console.log(err));
    }, []);

    function handleUserUpdate(key, val) {
        setUserUpdates({ ...userUpdates, [key]: val });
    }

    function checkPassword() {
        axios.get(`${import.meta.env.VITE_API_URL}/user-password/${localStorage.getItem("userId")}/${userUpdates.password}`)
            .then(response => {
                if (response.data.success) {
                    setCheckPass(false);
                    setEditable(true);
                } else {
                    toast.error("Incorrect Password");
                }
            })
            .catch(err => console.log(err));
    }

    async function updateUserInfo() {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/update-user-details/${localStorage.getItem("userId")}`, { userUpdates });
            if (response.data.success) {
                setUserUpdates({
                    name: response.data.user.name,
                    phone: response.data.user.phone,
                    email: response.data.user.email,
                    password: "***"
                });
                localStorage.setItem("userName", response.data.user.name);
                setCurrentUser(localStorage.getItem("userName"));
                toast.success("User Details Updated Sucessfully");
                setEditable(false);
            } else {
                setEditable(false);
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        userUpdates && <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container">
                <div className="d-flex justify-content-center">
                    <i className="fa-solid fa-user-tie fs-1 user-logo" />
                </div>
                {!checkPass ? <div className="row user-update bg-secondary-subtle shadow-lg rounded p-3 m-1">
                    {!editable && <i className="fa-solid fa-ellipsis-vertical text-end" onClick={() => setCheckPass(true)}></i>}
                    <form onSubmit={(e) => { e.preventDefault(); updateUserInfo() }}>
                        <table>
                            <thead>
                                <tr>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" className="p-2 fs-4">Name</th>
                                    <td><input type="text" className="update-input-field" required value={userUpdates.name} onChange={(e) => handleUserUpdate("name", e.target.value)} readOnly={!editable} /></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="p-2 fs-4">Phone</th>
                                    <td><input type="number" className="update-input-field disable-inc-dec-btn" required value={userUpdates.phone} onChange={(e) => handleUserUpdate("phone", e.target.value)} readOnly={!editable} /></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="p-2 fs-4">E-mail</th>
                                    <td><input type="email" className="update-input-field" required value={userUpdates.email} onChange={(e) => handleUserUpdate("email", e.target.value)} readOnly={!editable} /></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="p-2 fs-4">Password</th>
                                    <td><input type="password" className="update-input-field" required minLength={6} maxLength={10} value={userUpdates.password} onChange={(e) => handleUserUpdate("password", e.target.value)} readOnly={!editable} /></td>
                                </tr>
                            </tbody>
                        </table>
                        {editable && <div className="text-center update-btn mt-2">
                            <button className="btn btn-warning shadow">Update</button>
                        </div>}
                    </form>
                </div> :
                    <div className="row check-password shadow-lg rounded p-3 m-1">
                        <form onSubmit={(e) => { e.preventDefault(); checkPassword(); }}>
                            <table>
                                <thead>
                                    <tr>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className="p-2 fs-4">Password</th>
                                        <td><input type="text" className="update-input-field" value={userUpdates.password} required onChange={(e) => handleUserUpdate("password", e.target.value)} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center mt-2">
                                <button className="btn btn-warning shadow">Submit</button>
                            </div>
                        </form>
                    </div>}
            </div>
        </div>
    );
}

export default Account;
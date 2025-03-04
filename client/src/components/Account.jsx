import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import "../styles/Accounts.css";
import { context } from '../App';
import Loader from './Loader';

const Account = () => {

    const navigate = useNavigate();
    const [editable, setEditable] = useState(false);
    const [updates, setUpdates] = useState(null);
    const [checkPass, setCheckPass] = useState(false);
    const { setCurrentUser, currentUserId } = useContext(context);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/${localStorage.getItem("userId") ? "getUser" : "getSeller"}/${localStorage.getItem("userId") || localStorage.getItem("sellerId")}`)
            .then(response => {
                if (response.data.success && response.data.user) {
                    setUpdates({
                        name: response.data.user.name,
                        phone: response.data.user.phone,
                        email: response.data.user.email,
                        password: "*****"
                    });
                } else if (response.data.success && response.data.seller) {
                    const seller = response.data.seller;
                    setUpdates({
                        name: seller.name,
                        phone: seller.phone,
                        email: seller.email,
                        password: "*****",
                        businessName: seller.business.businessName,
                        taxId: seller.business.taxId,
                        businessAddress: seller.business.businessAddress,
                        businessType: seller.business.businessType
                    });
                }
                else {
                    toast.error("Login");
                    navigate('/user/login');
                }
            })
            .catch(err => console.log(err));
    }, []);

    function handleUpdate(key, val) {
        setUpdates({ ...updates, [key]: val });
    }

    function handleSellerAddressUpdates(key, val) {
        setUpdates(prev => ({
            ...prev,
            businessAddress: {
                ...businessAddress,
                [key]: val
            }
        }));
    }

    function checkPassword() {
        axios.get(`${import.meta.env.VITE_API_URL}/${localStorage.getItem("userId") ? "user" : "seller"}-password/${localStorage.getItem("userId") || localStorage.getItem("sellerId")}/${localStorage.getItem("userId") ? updates.password : updates.password}`)
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

    async function updateInfo() {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/update-${localStorage.getItem("userId") ? "user" : "seller"}-details/${localStorage.getItem("userId") || localStorage.getItem("sellerId")}`, { updates });
            if (response.data.success && response.data.user) {
                setUpdates({
                    name: response.data.user.name,
                    phone: response.data.user.phone,
                    email: response.data.user.email,
                    password: "***"
                });
                localStorage.setItem("userName", response.data.user.name);
                setCurrentUser(localStorage.getItem("userName"));
                toast.success("User Details Updated Sucessfully");
                setEditable(false);
            } else if (response.data.success && response.data.seller) {
                const { name, phone, email } = response.data.seller;
                const { businessName, businessType, taxId } = response.data.seller.business;
                const { street, city, state, pincode } = response.data.seller.business.businessAddress;
                setUpdates({
                    name, phone, email,
                    password: "***",
                    businessName, businessType, taxId,
                    businessAddress: {
                        street, city, state, pincode
                    }
                });
                localStorage.setItem("sellerName", name);
                setCurrentUser(localStorage.getItem("sellerName"));
                toast.success("Seller Details Updated Sucessfully");
                setEditable(false);
            }
            else {
                setEditable(false);
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        !updates ? <Loader /> : <div className="d-flex justify-content-center align-items-center vh-100">
            <div className={`container ${localStorage.getItem("sellerId") && "mt-5 pt-5"}`} >
                {localStorage.getItem("userId") && <div className="d-flex justify-content-center">
                    <i className="fa-solid fa-user-tie fs-1 user-logo" />
                </div>}
                {!checkPass ? <div className="row user-update bg-secondary-subtle shadow-lg rounded p-3 m-1">
                    {!editable && <i className="fa-solid fa-ellipsis-vertical text-end edit-user" onClick={() => setCheckPass(true)}></i>}
                    <form onSubmit={(e) => { e.preventDefault(); updateInfo() }}>
                        <table>
                            <thead>
                                <tr>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" className="p-2 fs-4">Name</th>
                                    <td><input type="text" className="update-input-field" id="accname" required value={updates.name} onChange={(e) => handleUpdate("name", e.target.value)} readOnly={!editable} /></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="p-2 fs-4">Phone</th>
                                    <td><input type="number" className="update-input-field disable-inc-dec-btn" id="accphone" required value={updates.phone} onChange={(e) => handleUpdate("phone", e.target.value)} readOnly={!editable} /></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="p-2 fs-4">E-mail</th>
                                    <td><input type="email" className="update-input-field" id="accemail" required value={updates.email} onChange={(e) => handleUpdate("email", e.target.value)} readOnly={!editable} /></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="p-2 fs-4">Password</th>
                                    <td><input type="password" className="update-input-field" id="accpass" required minLength={6} maxLength={10} value={updates.password} onChange={(e) => handleUpdate("password", e.target.value)} readOnly={!editable} /></td>
                                </tr>
                                {localStorage.getItem("sellerId") && <><tr>
                                    <th scope="row" className="p-2 fs-4">Business Name</th>
                                    <td><input type="text" className="update-input-field" id="business-name" value={updates.businessName} onChange={(e) => handleUpdate("businessName", e.target.value)} readOnly={!editable} /></td>
                                </tr>
                                    <tr>
                                        <th scope="row" className="text-center p-2 fs-4" colSpan="2">Business Address</th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 fs-4">Street</th>
                                        <td><input type="text" className="update-input-field" id="business-address-street" value={updates.businessAddress.street} onChange={(e) => handleSellerAddressUpdates("street", e.target.value)} readOnly={!editable} /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 fs-4">City</th>
                                        <td><input type="text" className="update-input-field" id="business-address-city" value={updates.businessAddress.city} onChange={(e) => handleSellerAddressUpdates("city", e.target.value)} readOnly={!editable} /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 fs-4">State</th>
                                        <td><input type="text" className="update-input-field" id="business-address-state" value={updates.businessAddress.state} onChange={(e) => handleSellerAddressUpdates("state", e.target.value)} readOnly={!editable} /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 fs-4">Pincode</th>
                                        <td><input type="number" className="update-input-field" id="business-address-pincode" value={updates.businessAddress.pincode} onChange={(e) => handleSellerAddressUpdates("pincode", e.target.value)} readOnly={!editable} /></td>
                                    </tr>
                                </>
                                }
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
                                        <td><input type="text" className="update-input-field" id="pass" value={updates.password} required onChange={(e) => handleUpdate("password", e.target.value)} /></td>
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
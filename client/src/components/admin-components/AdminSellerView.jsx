import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AdminSellerView = () => {

    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/seller-view`)
            .then(res => {
                if (res.data.success) {
                    setSellers(res.data.sellers);
                } else {
                    toast.error(res.data.message);
                }
            }).catch(err => {
                console.log(err.message);
                toast.error("Something went wrong please try again later");
            });
    }, []);

    async function deleteSellerAsAdmin(id) {
        if (confirm("Are you sure to Remove this Seller")) {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/seller-delete/${id}`);
            if (res.data.success) {
                toast.success(res.data.message);
                setSellers(sellers.filter(seller => seller._id != id));
            } else {
                toast.error(res.data.message);
            }
        }
    }

    return (
        <div className="container margin-top">
            <div className="row mx-1">
                <h1>Admin Sellers View</h1>
                {sellers.length > 0 ? (sellers.map(seller => <div key={seller._id}
                    className="border border-dark-subtle p-3 shadow rounded my-3 mx-auto col-12 col-md-5">
                    <h5 className="text-success">Seller Details</h5>
                    <h3>{seller._id}</h3>
                    <h5>{seller.name}</h5>
                    <p>{seller.phone}</p>
                    <p>{seller.email}</p>
                    <p className="text-truncate" style={{ width: "100%" }}>{seller.password}</p>
                    <hr />
                    <h5 className="text-success">Business Details</h5>
                    <p><b>Business Name &nbsp;</b>{seller.business.businessName}</p>
                    <p><b>Business Type &nbsp;</b>{seller.business.businessType}</p>
                    <p><b>TaxID &nbsp;</b>{seller.business.taxId}</p>
                    <p><b>Business Address &nbsp;</b>{seller.business.businessAddress.street}, </p>
                    <p>{seller.business.businessAddress.city}, {seller.business.businessAddress.state}, {seller.business.businessAddress.pincode}</p>
                    <p>{seller.createdAt}</p>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-danger shadow" onClick={() => deleteSellerAsAdmin(seller._id)}>Delete User</button>
                    </div>
                </div>)) : (
                    <h4>No Seller Found</h4>
                )}
            </div>
        </div>
    );
}

export default AdminSellerView;
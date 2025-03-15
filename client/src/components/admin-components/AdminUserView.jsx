import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AdminUserView = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/user-view`)
            .then(res => {
                if (res.data.success) {
                    setUsers(res.data.users);
                } else {
                    toast.error(res.data.message);
                }
            }).catch(err => console.log(err.message, "Something went wrong please try again later"));

    }, []);

    async function deleteUserAsAdmin(id) {
        if (confirm("Are you Sure to Remove this User")) {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/user-delete/${id}`);
            if (res.data.success) {
                toast.success(res.data.message);
                setUsers(users.filter(user => user._id != id));
            } else {
                toast.error(res.data.message);
            }
        }
    }

    return (
        <div className="container margin-top">
            <div className="row mx-1">
                <h1>Admin Users View</h1>
                {users.length > 0 ? (users.map(user => <div key={user._id}
                    className="border border-dark-subtle p-3 shadow rounded my-3 mx-auto col-12 col-md-5">
                    <h3>{user._id}</h3>
                    <h5>{user.name}</h5>
                    <p>{user.phone}</p>
                    <p>{user.email}</p>
                    <p className="text-truncate" style={{ width: "100%" }}>{user.password}</p>
                    <p>{user.createdAt}</p>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-danger shadow" onClick={() => deleteUserAsAdmin(user._id)}>Delete User</button>
                    </div>
                </div>)) : (
                    <h4>No User Found</h4>
                )}
            </div>
        </div>
    );
}

export default AdminUserView;
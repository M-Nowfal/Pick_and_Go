import React from 'react';
import { useParams } from 'react-router-dom';
import AdminUserView from './AdminUserView';
import AdminSellerView from './AdminSellerView';
import AdminLogin from './AdminLogin';
import AdminLogout from './AdminLogout';
import AdminCreation from './AdminCreation';

const AdminViewPage = () => {

    const { view } = useParams();

    switch(view){
        case "user":
            return <AdminUserView />
        case "seller": 
            return <AdminSellerView />
        case "login":
            return <AdminLogin />
        case "logout":
            return <AdminLogout />
        case "creation":
            return <AdminCreation />   
    }
}

export default AdminViewPage;
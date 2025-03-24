import React from 'react';
import { useParams } from 'react-router-dom';
import SellerLogin from './seller-components/SellerLogin';
import SellerLogout from './seller-components/SellerLogout';
import SellerSignin from './seller-components/SellerSignin';
import SellerSignout from './seller-components/SellerSignout';
import "../styles/Seller.css";
import SellerOrderPage from './seller-components/SellerOrderPage';
import AddProduct from './seller-components/AddProduct';

const SellerAuth = () => {

    const { auth } = useParams();

    switch(auth){
        case "add-product":
            return <AddProduct />;
        case "login":
            return <SellerLogin />;
        case "logout":
            return <SellerLogout />;
        case "signin":
            return <SellerSignin />;
        case "orderpage":
            return <SellerOrderPage />;
        default:
            return <SellerSignout />;
    }
}

export default SellerAuth;
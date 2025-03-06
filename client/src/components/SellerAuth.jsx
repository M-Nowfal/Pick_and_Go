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

    return (
        (auth == "add-product") ? <AddProduct /> : (auth == "login") ? <SellerLogin /> : (auth == "logout") ? <SellerLogout /> : (auth == "signin") ? <SellerSignin /> : (auth == "orderpage") ? <SellerOrderPage /> : <SellerSignout />
    );
}

export default SellerAuth;
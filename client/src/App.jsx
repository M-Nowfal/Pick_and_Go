import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "sonner";
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import Header from './components/Header';
import Slider from './components/Slider';
import { useState, createContext, useEffect } from 'react';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import Orders from './components/Orders';
import UserAuth from './components/UserAuth';
import Footer from './components/Footer';
import OrderPage from './components/OrderPage';
import CustomerCare from './components/CustomerCare';
import Account from './components/Account';
import Language from './components/Language';
import Seller from './components/Seller';
import SellerAuth from './components/SellerAuth';
import SellerViewPage from './components/seller-components/SellerViewPage';
import UpdateProduct from './components/seller-components/UpdateProduct';
import AdminViewPage from './components/admin-components/AdminViewPage';

export const context = createContext(0);

function App() {

	const [currentUser, setCurrentUser] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const [render, setRender] = useState(true);
	const [currentUserId, setCurrentUserId] = useState(null);
	const [products, setProducts] = useState(null);
	const [cartItemsOrdered, setCartItemsOrdered] = useState(false);
	const [tryingToOrder, setTryingToOrder] = useState(false);
	const [category, setCategory] = useState("all");

	useEffect(() => {
		const storedUser = localStorage.getItem("userName");
		const storedUserId = localStorage.getItem("userId");
		const storedSeller = localStorage.getItem("sellerName");
		const storedSellerId = localStorage.getItem("sellerId");
		if (storedUser || storedSeller) setCurrentUser(storedUser || storedSeller);
		if (storedUserId || storedSeller) setCurrentUserId(storedUserId || storedSellerId);
	}, []);

	const contextValues = {
		totalItems, setTotalItems,
		currentUserId, setCurrentUserId,
		setCurrentUser, cartItemsOrdered,
		setCartItemsOrdered, tryingToOrder,
		setTryingToOrder, category, setCategory
	}

	return (

		<BrowserRouter>
			<Toaster position="top-center" richColors swipeDirections={["left", "right"]} />
			<context.Provider value={ contextValues }>
				<Header currentUser={currentUser} />
				<Slider currentUser={currentUser} />
				<div className="main-container">
					<div className="content">
						<Routes>
							<Route path="/" element={<Home products={products} setProducts={setProducts} />} />
							<Route path="/product-details/:id" element={<ProductDetail />} />
							<Route path='/cart/:userId' element={<CartPage render={render} setRender={setRender} />} />
							<Route path='/user/:auth' element={<UserAuth />} />
							<Route path='/orders' element={<Orders />} />
							<Route path='/order-page' element={<OrderPage />} />
							<Route path='/customer-care' element={<CustomerCare />} />
							<Route path='/getUser' element={<Account />} />
							<Route path='/language' element={<Language />} />
							<Route path='/seller' element={<Seller />} />
							<Route path='/seller/:auth' element={<SellerAuth />} />
							<Route path='/seller/viewpage' element={<SellerViewPage />} />
							<Route path='/seller/update-product/:productId' element={<UpdateProduct />} />
							<Route path='/admin/:view' element={<AdminViewPage />} />
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</div>
				</div>
				<Footer />
			</context.Provider>
		</BrowserRouter>
	);
}

export default App;
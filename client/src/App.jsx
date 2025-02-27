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

export const context = createContext(0);

function App() {

	const [currentUser, setCurrentUser] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const [render, setRender] = useState(true);
	const [currentUserId, setCurrentUserId] = useState(null);
	const [products, setProducts] = useState(null);
	const [cartItemsOrdered, setCartItemsOrdered] = useState(false);
	const [tryingToOrder, setTryingToOrder] = useState(false);

	useEffect(() => {
		const storedUser = localStorage.getItem("userName");
		const storedUserId = localStorage.getItem("userId");
		if (storedUser) setCurrentUser(storedUser);
		if (storedUserId) setCurrentUserId(storedUserId);
	}, []);

	return (

		<BrowserRouter>
			<Toaster position="top-right" richColors swipeDirections={["left", "right"]} />
			<context.Provider value={{ totalItems, setTotalItems, 
										currentUserId, setCurrentUserId, 
										setCurrentUser, cartItemsOrdered, 
										setCartItemsOrdered, tryingToOrder, 
										setTryingToOrder 
									}}>
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
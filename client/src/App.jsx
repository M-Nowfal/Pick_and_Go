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
import { useState } from 'react';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import Orders from './components/Orders';

function App() {

	const [currentUser, setCurrentUser] = useState("Guest");
	const [totalItems, setTotalItems] = useState(0);
	const [render, setRender] = useState(true);

	return (
		
		<BrowserRouter>
			<Toaster position="top-center" richColors />
			<Header totalItems={totalItems} />
			<Slider name={currentUser} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product-details/:id" element={<ProductDetail />} />
				<Route path='/cart/:userId' element={<CartPage render={render} setRender={setRender} totalItems={totalItems} setTotalItems={setTotalItems} />} />
				<Route path='/orders' element={<Orders />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

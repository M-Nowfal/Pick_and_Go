import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { context } from '../../App';
import axios from 'axios';
import { toast } from 'sonner';

const SellerSignout = () => {

    const navigate = useNavigate();
	const { setCurrentUserId, setCurrentUser } = useContext(context);
	const [sellerDetails, setSellerDetails] = useState({
		phone: "",
		email: "",
		password: ""
	});

	function handleSellerDetails(key, val) {
		setSellerDetails({ ...sellerDetails, [key]: val });
	}

	function deleteSeller() {
		axios.get(import.meta.env.VITE_API_URL + `${"/seller/sign-out"}/${localStorage.getItem("sellerId")}/${sellerDetails.password}`)
			.then(response => {
				if (response.data.success) {
					toast.success(response.data.message);
					localStorage.clear();
					setCurrentUser(null);
					setCurrentUserId(null);
					navigate('/');
				} else {
					toast.error(response.data.message);
				}
			}).catch(err => toast.error(err.message));
	}

    return (
        <div className="container">
			<div className="row">
				<form onSubmit={(e) => { e.preventDefault(); deleteSeller() }}>
					<div className="d-flex justify-content-center align-items-center vh-100">
						<div className="col-12 col-md-6">
							<div className="user-form p-3 bg-dark shadow-lg text-warning">
								<h3 className="text-center text-warning">Seller Sign Out</h3>
								<label htmlFor="phone" className="user-label-field">Phone</label>
								<input type="number" id="phone" className="user-input-field" placeholder="Enter Phone"
									name="phone"
									value={sellerDetails.phone}
									autoComplete="off"
									onChange={(e) => handleSellerDetails("phone", e.target.value)}
									required
								/>

								<label htmlFor="email" className="user-label-field">E-mail</label>
								<input type="email" id="email" className="user-input-field" placeholder="Enter E-mail"
									name="email"
									value={sellerDetails.email}
									autoComplete="off"
									onChange={(e) => handleSellerDetails("email", e.target.value)}
									required
								/>

								<label htmlFor="password" className="user-label-field">Password</label>
								<input type="password" id="password" className="user-input-field" placeholder="Enter Password"
									name="password"
									value={sellerDetails.password}
									autoComplete="off"
									onChange={(e) => handleSellerDetails("password", e.target.value)}
									required
								/>
								<div className="text-center mt-2">
									<button className="btn btn-warning my-3 fw-bold">Sign-out</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
    );
}

export default SellerSignout;
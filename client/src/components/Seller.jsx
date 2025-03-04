import React from 'react';
import { Link } from 'react-router-dom';

const Seller = () => {
    return (
        <div>
            <div className="container mt-5 pt-5">
                <div className="row mt-5">
                    <h2 className="fw-bold text-success">Welcome to Pick & Go Seller Page</h2>
                    <p>Create a Seller Account to sell products</p>
                    <b>Click the below link to create seller account</b>
                    <Link to='/seller/signin'>Seller sign-in</Link>
                </div>
            </div>
        </div>
    );
}

export default Seller;
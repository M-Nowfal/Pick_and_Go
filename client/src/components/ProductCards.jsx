import "../styles/productCard.css";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductCards = ({ id, verified, name, image, price, description, ratings }) => {

    const navigate = useNavigate();

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-3">
            <div className={`card text-center shadow ${verified ? "" : "opacity-50"}`}>
                <div className="d-flex d-sm-block align-items-center">
                    <div className="text-center images-container">
                        <Link to={verified ? (`/product-details/${id}`) : null } className="text-decoration-none">
                            <img className="card-img-top product-images" src={image} alt="Card image cap" />
                        </Link>
                    </div>
                    <div className="card-body">
                        <div onClick={() => {
                            verified ? navigate(`/product-details/${id}`) : null
                        }}>
                            <h5 className="card-title">{name}</h5>
                            <p className="product-description text-secondary d-none d-sm-block">{description}</p>
                        </div>
                        <div className="ratings mt-auto">
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${ratings / 5 * 100}%` }} ></div>
                            </div>
                        </div>
                        <h6 className="ratings-num text-secondary">{ratings}</h6>
                        <h5>
                            <span className="text-secondary">INR </span>
                            <sup className="text-danger">₹</sup>{price}
                        </h5>
                        <Link to={verified ? (`/product-details/${id}`) : null } className="btn btn-warning mt-2 shadow">View Product</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCards;
import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = (props) => {
    return (
        <div className="card text-center shadow">
            <div className="d-flex align-items-center">
                <div className="col-6 col-xl-4 text-center images-container">
                    <Link to={`/product-details/${props.id}`} className="text-decoration-none">
                        <img className="card-img-top product-images" src={props.image} alt="Card image cap" />
                    </Link>
                </div>
                <div className="d-none d-xl-block col-xl-4">{props.description}</div>
                <div className="card-body col-6 col-xl-4">
                    <h5 className="card-title">{props.name}</h5>
                    <h5>
                        <span className="text-secondary">INR </span>
                        <sup className="text-danger">₹</sup>{props.price}
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;
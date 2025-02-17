import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import Loader from './Loader';

const ProductDetail = () => {

    const [product, setProduct] = useState();
    const [imgage, setImage] = useState();
    const [len, setLen] = useState(0);
    const [count, setCount] = useState(1);
    let currentImage = useRef(0);
    const {id} = useParams();

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL+"/product-details/"+id)
        .then(response => setProduct(response.data))
        .catch(err => console.log(err.message))
    },[]);

    useEffect(() => {
        product && setImage(product.images[0]);
        product && setLen(product.images.length);
    },[product])

    function addToCart() {
        axios.post(import.meta.env.VITE_API_URL+"/add-to-cart",{
            userId: import.meta.env.VITE_USER,
            productId: id,
            quantity: count
        })
        .then(response => toast.success(response.data.message))
        .catch(err => toast.error("Err while adding to Cart"));
    }

    if (!product) {
        return (
           <Loader />
        );
    }

    return (
        product && <div className="container product-container mb-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="card text-center shadow-lg">
                        <div className="text-center mt-4">
                            <img className="card-img-top product-image" src={imgage} alt="Card image cap" />
                            <div className="d-flex justify-content-center">
                                <div className="me-5 pe-5">
                                    <i className="fa-solid fa-angle-left bg-secondary p-2 rounded-circle text-white" onClick={() => {
                                        currentImage.current = (currentImage.current - 1 + len) % len;
                                        setImage(product.images[currentImage.current]); 
                                        }}>
                                    </i>
                                </div>
                                <div className="ms-5 ps-5">
                                    <i className="fa-solid fa-angle-right bg-secondary p-2 rounded-circle text-white" onClick={() => {
                                        currentImage.current = (currentImage.current + 1) % len;
                                        setImage(product.images[currentImage.current]); 
                                        }}>
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="product-description">{product.description}</p>
                            <div className="ratings">
                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }} ></div>
                                </div>
                            </div>
                            <h6 className="ratings-num text-secondary">{product.ratings}</h6>
                            <h5><span className="fs-6">Brand</span> {product.brand}</h5>
                            <h6>Available Stock <span className="text-success">{product.stock}</span></h6>
                            <h5>
                                <span className="text-secondary">INR </span>
                                <sup className="text-danger">₹</sup>{product.price}
                            </h5>
                            <div>
                                <h6>
                                    <i className="fa-solid fa-circle-minus text-danger" onClick={() => count > 1 && setCount(count-1)}></i>
                                    &nbsp;Quantity : {count}&nbsp; 
                                    <i className="fa-solid fa-circle-plus text-success" onClick={() => count < product.stock && setCount(count+1)}></i></h6>
                            </div>
                            <button className="btn btn-warning m-2 w-50 shadow" onClick={addToCart}>Add to Cart</button>
                            <Link to="/ss" className="btn btn-warning m-2 w-50 shadow">Buy now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;

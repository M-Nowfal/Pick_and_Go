import axios from 'axios';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Loader from './Loader';
import { context } from '../App';
import "../styles/productDetail.css";

const ProductDetail = () => {

    const [product, setProduct] = useState();
    const [imgage, setImage] = useState();
    const [len, setLen] = useState(0);
    const [count, setCount] = useState(1);
    let currentImage = useRef(0);
    const { id } = useParams();
    const { currentUserId } = useContext(context);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/product-details/" + id)
            .then(response => setProduct(response.data.product))
            .catch(err => console.log(err.message));
    }, []);

    useEffect(() => {
        product && setImage(product.images[0]);
        product && setLen(product.images.length);
    }, [product])

    const { totalItems, setTotalItems } = useContext(context);

    function addToCart() {
        axios.post(import.meta.env.VITE_API_URL + "/add-to-cart", {
            userId: currentUserId,
            productId: id,
            quantity: count
        })
            .then(response => {
                response.data.success && setTotalItems(totalItems + count);
                return toast.success(response.data.message);
            })
            .catch(err => toast.error("Err while adding to Cart"));
    }

    return (
        !product ? <Loader /> :
            <div className="d-flex justify-content-center align-items-center product-detail-outer-container">
                <div className="container product-detail-container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-12 col-md-6 text-center p-5">
                                    <img className="img-fluid product-image" src={imgage} alt="Card image cap" />
                                    <div className="d-flex justify-content-center text-center">
                                        <div className="me-5 pe-5">
                                            <i className="fa-solid fa-angle-left bg-secondary p-2 rounded-circle text-white cursor" onClick={() => {
                                                currentImage.current = (currentImage.current - 1 + len) % len;
                                                setImage(product.images[currentImage.current]);
                                            }}>
                                            </i>
                                        </div>
                                        <div className="ms-5 ps-5">
                                            <i className="fa-solid fa-angle-right bg-secondary p-2 rounded-circle text-white cursor" onClick={() => {
                                                currentImage.current = (currentImage.current + 1) % len;
                                                setImage(product.images[currentImage.current]);
                                            }}>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 text-center p-5">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="product-description">{product.description}</p>
                                    <div className="ratings">
                                        <div className="rating-outer">
                                            <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }} ></div>
                                        </div>
                                    </div>
                                    <h6 className="ratings-num text-secondary">{product.ratings}</h6>
                                    <h5><span className="fs-6">Brand</span> {product.brand}</h5>
                                    {
                                        product.stock == 0 ? <h6 className="text-danger">Out of Stock</h6>
                                            : <h6>Available Stock <span className="text-success">{product.stock}</span></h6>
                                    }
                                    <h5>
                                        <span className="text-secondary">INR </span>
                                        <sup className="text-danger">₹</sup>{product.price}
                                    </h5>
                                    <div className={`d-flex justify-content-center ${!product.stock ? "d-none" : "d-block"}`}>
                                        <h6>
                                            <i className="fa-solid fa-circle-minus text-danger fs-5 cursor" onClick={() => count > 1 && setCount(count - 1)}></i>
                                            &nbsp;&nbsp;Quantity : {count}&nbsp;&nbsp;
                                            <i className="fa-solid fa-circle-plus text-success fs-5 cursor" onClick={() => count < product.stock && setCount(count + 1)}></i>
                                        </h6>
                                    </div>
                                    <button className="btn btn-warning m-2 w-50 shadow" disabled={!product.stock} onClick={() => (currentUserId) ? addToCart() : toast.error("Login to add Products to Cart")}>Add to Cart</button>
                                    <button className="btn btn-warning m-2 w-50 shadow" disabled={!product.stock} onClick={() => (currentUserId) ? navigate(`/orders/?single=true&productId=${id}&qty=${count}`) : (toast.error("Login to add Products to Cart"), navigate('/user/login'))}>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ProductDetail;
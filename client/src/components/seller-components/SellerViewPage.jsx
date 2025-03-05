import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'sonner';
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const SellerViewPage = () => {

    const [products, setProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/seller/view/${localStorage.getItem("sellerId")}`)
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(err => console.log(err.message));
    }, []);

    return (
        !products ? <Loader /> : products.length >= 1 ? (<div className="container margin-top">
            <div className="row w-100 mx-0 mt-5">
                <div className="col-12 px-0 mt-2">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col" className="d-none d-lg-table-cell">Description</th>
                                <th scope="col" className="d-none d-lg-table-cell">Brand</th>
                                <th scope="col" className="d-none d-lg-table-cell">Stock</th>
                                <th scope="col" className="d-none d-lg-table-cell">Category</th>
                                <th scope="col">Image</th>
                                <th scope="col">Price</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, index) => <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td className="d-none d-lg-table-cell">{item.description}</td>
                                <td className="d-none d-lg-table-cell">{item.brand}</td>
                                <td className="d-none d-lg-table-cell">{item.stock}</td>
                                <td className="d-none d-lg-table-cell">{item.category}</td>
                                <td>
                                    <img src={item.images[0]} alt="Product" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
                                </td>
                                <td>{item.price}</td>
                                <td className="text-center cursor">
                                    <i className="fa-solid fa-ellipsis-vertical" onClick={() => {
                                        navigate(`/seller/update-product/${item._id}`, { state: {product: item } })
                                    }}/>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                    <div className="position-fixed add-product-btn">
                        <i className="fa-solid fa-circle-plus text-warning fs-1 cursor"></i>
                    </div>
                </div>
            </div>
        </div>) : (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="row text-center">
                    <h1 className="fs-1 fw-bold">No Products Added</h1>
                    <div className="text-center">
                        <button className="btn btn-warning shadow">Add Product</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default SellerViewPage;

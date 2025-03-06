import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AddProduct = () => {

    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState({
        name: "",
        price: "",
        description: "",
        brand: "",
        stock: "",
        category: "",
        image1: "",
        image2: "",
        image3: "",
        sellerId: localStorage.getItem("sellerId"),
        ratings: ""
    });

    async function addProduct() {
        axios.post(`${import.meta.env.VITE_API_URL}/seller/add-product`, { productDetails })
            .then(response => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate('/seller/viewpage');
                }else{
                    toast.error(response.data.message);
                }
            })
            .catch(err => {
                console.log(err.message);
                toast.error("Something went wrong, please try again later");
            });
    }

    function handleChange(e) {
        setProductDetails(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ));
    }

    return (
        <div className="container margin-top mb-4">
            <h2 className="text-center">Add New Product</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                addProduct();
            }} className="mt-3">
                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-name">Name*</label>
                    <input type="text" className="form-control" name="name" id="p-name" value={productDetails.name} autoComplete="off" onChange={handleChange} placeholder="Name of the Product" required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-price">Price*</label>
                    <input type="number" className="form-control disable-inc-dec-btn" name="price" id="p-price" value={productDetails.price} onChange={handleChange} placeholder="Price" required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-description">Description*</label>
                    <textarea className="form-control" name="description" id="p-description" value={productDetails.description} onChange={handleChange} placeholder="Description" required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-stock">Stock*</label>
                    <input type="number" className="form-control" name="stock" id="p-stock" value={productDetails.stock} onChange={handleChange} placeholder="Stock" required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-brand">Brand*</label>
                    <input type="text" className="form-control" name="brand" id="p-brand" value={productDetails.brand} onChange={handleChange} placeholder="Brand" required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-category">Category*</label>
                    <input type="text" className="form-control" name="category" id="p-category" value={productDetails.category} onChange={handleChange} placeholder="Product Category" required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-ratings">Ratings*</label>
                    <input type="number" min={1} max={5} className="form-control" name="ratings" id="p-ratings" value={productDetails.ratings} onChange={handleChange} placeholder="Ratings" required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="images">Image URL*</label>
                    <input type="text" className="form-control my-2" name="image1" id="images" value={productDetails.image1} onChange={handleChange} placeholder="Image URL-1" required />
                    <input type="text" className="form-control my-2" name="image2" value={productDetails.image2} onChange={handleChange} placeholder="Image URL-2 (Optional)" />
                    <input type="text" className="form-control my-2" name="image3" value={productDetails.image3} onChange={handleChange} placeholder="Image URL-3 (Optional)" />
                    <div className="mt-2 text-center">
                        {productDetails.image1 && <img src={productDetails.image1} className="mx-5 my-3" alt="Product Preview" style={{ width: "200px", height: "200px", objectFit: "contain" }} />}
                        {productDetails.image2 && <img src={productDetails.image2} className="mx-5 my-3" alt="Product Preview" style={{ width: "200px", height: "200px", objectFit: "contain" }} />}
                        {productDetails.image3 && <img src={productDetails.image3} className="mx-5 my-3" alt="Product Preview" style={{ width: "200px", height: "200px", objectFit: "contain" }} />}
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" name="update-product" className="btn btn-warning shadow m-2">Add Product</button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
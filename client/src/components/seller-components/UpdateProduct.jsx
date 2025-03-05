import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const UpdateProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    // State to store updated values
    const [updatedProduct, setUpdatedProduct] = useState({
        id: product?._id,
        name: product?.name || "",
        price: product?.price || "",
        description: product?.description || "",
        stock: product?.stock || "",
        brand: product?.brand || "",
        category: product?.category || "",
        image1: product?.images[0] || "",
        image2: product?.images[1] || "",
        image3: product?.images[2] || "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.put(`${import.meta.env.VITE_API_URL}/seller/update-product`, { updatedProduct })
            .then(response => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate('/seller/viewpage')
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(err => console.log(err.message));
    };

    return (
        <div className="container margin-top mb-4">
            <h2 className="text-center">Update Product</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <input type="text" className="form-control" name="name" value={updatedProduct.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Price</label>
                    <input type="number" className="form-control" name="price" value={updatedProduct.price} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea className="form-control" name="description" value={updatedProduct.description} onChange={handleChange} required></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Stock</label>
                    <input type="number" className="form-control" name="stock" value={updatedProduct.stock} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Brand</label>
                    <input type="text" className="form-control" name="brand" value={updatedProduct.brand} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Category</label>
                    <input type="text" className="form-control" name="category" value={updatedProduct.category} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Image URL</label>
                    <input type="text" className="form-control my-2" name="image1" value={updatedProduct.image1} onChange={handleChange} required />
                    <input type="text" className="form-control my-2" name="image2" value={updatedProduct.image2} onChange={handleChange} />
                    <input type="text" className="form-control my-2" name="image3" value={updatedProduct.image3} onChange={handleChange} />
                    <div className="mt-2">
                        <img src={updatedProduct.image1} className="mx-2" alt="Product Preview" style={{ width: "200px", height: "200px", objectFit: "contain" }} />
                        <img src={updatedProduct.image2} className="mx-2" alt="Product Preview" style={{ width: "200px", height: "200px", objectFit: "contain" }} />
                        <img src={updatedProduct.image3} className="mx-2" alt="Product Preview" style={{ width: "200px", height: "200px", objectFit: "contain" }} />
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Update Product</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;

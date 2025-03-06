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
    const handleUpdates = async (e) => {
        if (e.target.name == "update-product") {
            axios.put(`${import.meta.env.VITE_API_URL}/seller/update-product`, { updatedProduct })
                .then(response => {
                    if (response.data.success) {
                        toast.success(response.data.message);
                        navigate('/seller/viewpage');
                    } else {
                        toast.error(response.data.message);
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    toast.error("Something went wrong, please try again later");
                });
        } else {
            if (confirm("Are you Sure to Delete the Product")) {
                axios.delete(`${import.meta.env.VITE_API_URL}/seller/remove-product/${product?._id}`)
                    .then(response => {
                        if (response.data.success) {
                            toast.success(response.data.message);
                            navigate('/seller/viewpage');
                        } else {
                            toast.error(response.data.message);
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                        toast.error("Something went wrong, please try again later");
                    });
            }
        }
    };

    return (
        <div className="container margin-top mb-4">
            <h2 className="text-center">Update Product</h2>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3">
                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-name">Name</label>
                    <input type="text" className="form-control" name="name" id="p-name" value={updatedProduct.name} autoComplete="off" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-price">Price</label>
                    <input type="number" className="form-control" name="price" id="p-price" value={updatedProduct.price} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-description">Description</label>
                    <textarea className="form-control" name="description" id="p-description" value={updatedProduct.description} onChange={handleChange} required></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-stock">Stock</label>
                    <input type="number" className="form-control" name="stock" id="p-stock" value={updatedProduct.stock} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-brand">Brand</label>
                    <input type="text" className="form-control" name="brand" id="p-brand" value={updatedProduct.brand} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="p-category">Category</label>
                    <input type="text" className="form-control" name="category" id="p-category" value={updatedProduct.category} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="images">Image URL</label>
                    <input type="text" className="form-control my-2" name="image1" id="images" value={updatedProduct.image1} onChange={handleChange} required />
                    <input type="text" className="form-control my-2" name="image2" value={updatedProduct.image2} onChange={handleChange} />
                    <input type="text" className="form-control my-2" name="image3" value={updatedProduct.image3} onChange={handleChange} />
                    <div className="mt-2 text-center">
                        {updatedProduct.image1 && <img src={updatedProduct.image1} className="mx-5 my-3" alt="Product Preview" style={{ width: "200px", height: "200px", objectFit: "contain" }} />}
                        {updatedProduct.image2 && <img src={updatedProduct.image2} className="mx-5 my-3" alt="Product Preview" style={{ width: "200px", height: "200px", objectFit: "contain" }} />}
                        {updatedProduct.image3 && <img src={updatedProduct.image3} className="mx-5 my-3" alt="Product Preview" style={{ width: "200px", height: "200px", objectFit: "contain" }} />}
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" name="delete-product" onClick={handleUpdates} className="btn btn-danger m-2">Delete Product</button>
                    <button type="submit" name="update-product" onClick={handleUpdates} className="btn btn-primary m-2">Update Product</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
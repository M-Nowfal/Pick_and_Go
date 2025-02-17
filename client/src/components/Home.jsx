import React, { useEffect, useState } from 'react';
import ProductCards from './ProductCards';
import Loader from './Loader';
import axios from "axios";

const Home = () => {

    const [products, setProducts] = useState(null);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL)
            .then(response => setProducts(response.data))
            .catch(error => console.log(error.message));
    }, []);

    if (!products) {
        return (
            <Loader />
        );
    }

    return (
        <div className="container-fluid product-container">
            <div className="row justify-content-center mb-3">
                {
                    products.map(product => (
                        <ProductCards key={product._id}
                            id={product._id}
                            name={product.name}
                            image={product.images[0]}
                            price={product.price}
                            description={product.description}
                            ratings={product.ratings}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Home;
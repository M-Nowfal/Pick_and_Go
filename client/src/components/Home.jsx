import React, { useEffect, useState } from 'react';
import ProductCards from './ProductCards';

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err.message));
    }, []);

    if (!products) {
        return (
            <div>
                <h1 className="d-flex justify-content-center align-items-center h-100">Loading...</h1>
            </div>
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
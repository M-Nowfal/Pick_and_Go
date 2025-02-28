import React, { useContext, useEffect } from 'react';
import ProductCards from './ProductCards';
import Loader from './Loader';
import axios from "axios";
import { context } from '../App';
import { toast } from 'sonner';

const Home = ({ products, setProducts }) => {

    useEffect(() => {
        !products && axios.get(import.meta.env.VITE_API_URL)
            .then(response => setProducts(response.data.products))
            .catch(error => console.log(error.message));
    }, []);

    const { category } = useContext(context);

    let categorizedProducts = null;

    if(products){
        switch(category) {
            case "all":
                categorizedProducts = products;
                break;
            case "other":
                categorizedProducts = products.filter(item => (item.category != "mobile" && item.category != "laptop"));
                break;
            case category:
                categorizedProducts = products.filter(item => item.category == category);
                break;
            default:
                toast.error("Error occured");
                break;
        }
    }

    return (
        !products ? <Loader /> : <div className="container-fluid product-container">
            <div className="row justify-content-center mb-3">
                {category != "all" && <h2 className="text-center text-primary fw-bold fs-1 mt-4">{category.toUpperCase()}S</h2>}
                {
                    categorizedProducts.map(product => (
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
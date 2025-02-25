import { useEffect, useRef, useState } from "react";
import "../styles/order.css";
import axios from "axios";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import OrderAccordian1 from "./order/OrderAccordian1";
import OrderAccordian2 from "./order/OrderAccordian2";
import OrderAccordian3 from "./order/OrderAccordian3";

const Orders = () => {

    const [searchParam] = useSearchParams();
    const [orderProducts, setOrderProducts] = useState(null);
    const [single, setSingle] = useState(null);
    const [totalAmt, setTotalAmt] = useState(0);

    useEffect(() => {
        if (searchParam.get("single") == "true") {
            axios.get(import.meta.env.VITE_API_URL + "/product-details/" + searchParam.get("productId"))
                .then(response => {
                    setOrderProducts({ productId: response.data.product });
                    setSingle(true);
                    setTotalAmt(response.data.product.price);
                })
                .catch(err => console.log(err.message));
        } else {
            axios.get(import.meta.env.VITE_API_URL + `/cart-items/${localStorage.getItem("userId")}`)
                .then(response => {
                    const data = response.data;
                    setOrderProducts(data.cart);
                    setSingle(false);
                    const amt = data.cart.cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
                    setTotalAmt(amt);
                }).catch((err) => {
                    toast.error(err.message)
                    setOrderProducts({ cartItems: [] });
                });
        }
    }, []);

    const [orderDetails, setOrderDetails] = useState({
        name: "",
        phone: "",
        address: "",
        state: "",
        postalCode: "",
        country: "",
        paymentMethod: "COD",
        payOnline: "GPay"
    });

    const order = useRef(false);

    function handleOrderDetails(key, val) {
        setOrderDetails({ ...orderDetails, [key]: val });
    }

    return (
        <div className="order-container">
            <div className="container">
                <div className="accordion" id="accordionExample">
                    <OrderAccordian1 
                        orderProducts={orderProducts} 
                        single={single} 
                    />
                    <OrderAccordian2 
                        orderDetails={orderDetails} 
                        order={order} 
                        handleOrderDetails={handleOrderDetails} 
                    />
                    <OrderAccordian3 
                        orderDetails={orderDetails} 
                        handleOrderDetails={handleOrderDetails} 
                        totalAmt={totalAmt} 
                        orderProducts={orderProducts} 
                        single={single} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Orders;
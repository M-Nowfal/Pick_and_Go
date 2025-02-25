import React from 'react';
import CartItem from '../CartItem';
import Loader from '../Loader';

const OrderAccordian1 = ({ orderProducts, single }) => {
    return (
        !orderProducts ? <Loader /> : <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Order Summary
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    {!single && orderProducts && orderProducts.cartItems.map(item => <CartItem key={item.productId._id} item={item} />)}
                    {single && <CartItem item={orderProducts} />}
                </div>
            </div>
        </div>
    );
}

export default OrderAccordian1;
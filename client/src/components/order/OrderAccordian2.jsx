import React from 'react';
import { toast } from 'sonner';

const OrderAccordian2 = ({ orderDetails, order, handleOrderDetails }) => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Order Address
                </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <div className="row bg-dark rounded shadow-lg text-warning fw-bold p-2 pb-3 m-2">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="my-3">
                                <label className="form-label" htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    className={`form-control order-input-field ${!orderDetails.name && order.current && "empty-field"}`}
                                    id="name"
                                    value={orderDetails.name}
                                    placeholder="Enter your full name"
                                    required
                                    autoComplete="name"
                                    onChange={(e) => handleOrderDetails("name", e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="phone">Phone Number</label>
                                <input
                                    type="number"
                                    className={`form-control order-input-field ${!orderDetails.phone && order.current && "empty-field"}`}
                                    id="phone"
                                    value={orderDetails.phone}
                                    placeholder="Enter your phone number"
                                    required
                                    autoComplete="number"
                                    onChange={(e) => handleOrderDetails("phone", e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="address">Address</label>
                                <textarea
                                    className={`form-control order-input-field ${!orderDetails.address && order.current && "empty-field"}`}
                                    id="address"
                                    value={orderDetails.address}
                                    placeholder="Enter your address"
                                    rows="3"
                                    required
                                    autoComplete="street-address"
                                    onChange={(e) => handleOrderDetails("address", e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label className="form-label" htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        className={`form-control order-input-field ${!orderDetails.city && order.current && "empty-field"}`}
                                        id="city"
                                        value={orderDetails.city}
                                        placeholder="Enter city"
                                        required
                                        autoComplete="address-level2"
                                        onChange={(e) => handleOrderDetails("city", e.target.value)}
                                    />
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label" htmlFor="postal-code">Postal Code</label>
                                    <input
                                        type="text"
                                        className={`form-control order-input-field ${!orderDetails.postalCode && order.current && "empty-field"}`}
                                        id="postal-code"
                                        value={orderDetails.postalCode}
                                        placeholder="Enter postal code"
                                        required
                                        autoComplete="postal-code"
                                        onChange={(e) => handleOrderDetails("postalCode", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    className={`form-control order-input-field ${!orderDetails.country && order.current && "empty-field"}`}
                                    id="country"
                                    value={orderDetails.country}
                                    placeholder="Enter country"
                                    required
                                    autoComplete="country-name"
                                    onChange={(e) => handleOrderDetails("country", e.target.value)}
                                />
                            </div>
                            <div className="text-center mb-2">
                                <button className="btn btn-custom mt-2 text-black fw-bold" data-bs-toggle="collapse" data-bs-target={(!orderDetails.name || !orderDetails.phone || !orderDetails.address || !orderDetails.city || !orderDetails.postalCode || !orderDetails.country) ? null : "#collapseThree"}
                                    onClick={() => {
                                        order.current = true;
                                        if (!(orderDetails.phone.length === 10) ? true : false) {
                                            toast.error("Please enter valid phone Number");
                                        }
                                    }}>Proceed to pay</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderAccordian2;
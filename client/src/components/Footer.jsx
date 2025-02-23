import React from 'react';
import "../styles/footer.css";

const Footer = () => {
    return (
        <div className="main-container">
            <div className="content">
                
            </div>
            <footer className="bg-dark text-light pt-4 pb-2 footer-container">
                <div className="container">
                    <i className="fa-solid fa-circle-chevron-up fs-4 cursor"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        title="Go to top">
                    </i>

                    <div className="row text-center">
                        <div className="col-md-4 mb-3">
                            <h5 className="fw-bold text-warning">Pick & Go</h5>
                            <p>Your one-stop shop for the best products at unbeatable prices!</p>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h5 className="fw-bold text-warning">Quick Links</h5>
                            <ul className="list-unstyled">
                                <li>Home</li>
                                <li>Shop</li>
                                <li>About us</li>
                                <li>Contact</li>
                            </ul>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h5 className="fw-bold text-warning">Contact Us</h5>
                            <p>Email: support@pickandgo.com</p>
                            <p>Phone: +91 98765 43210</p>
                            <i className="fab fa-facebook fs-5 mx-2"></i>
                            <i className="fab fa-twitter fs-5 mx-2"></i>
                            <i className="fab fa-instagram fs-5 mx-2"></i>
                        </div>
                    </div>

                    <hr className="bg-light" />
                    <p className="text-center m-0">© {new Date().getFullYear()} Pick & Go. All Rights Reserved.</p>
                </div>
            </footer>
        </div>

    );
}

export default Footer;
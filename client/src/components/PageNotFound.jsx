import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <div className="content">
                <h1 className=""><span className="text-danger">404</span> Not Found</h1>
                <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
            </div>
        </div>
    );
}

export default PageNotFound;

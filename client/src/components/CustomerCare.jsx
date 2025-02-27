import React from 'react';

const CustomerCare = () => {
    return (
        <div>
            <div className="container mt-5 pt-5">
                <div className="row mt-5">
                    <h4 className="fw-bold">Having Trouble Logging In or Logging Out?</h4>
                    <p>
                        If you encounter frequent error messages while trying to log in or log out, even after entering the correct phone number and password, 
                        you can try clearing your session history. Simply type <span className="text-success fw-bold text-decoration-underline">clear</span> in the search bar and search.
                    </p>
                    <p>
                        If the issue persists, please ensure that your browser cache and cookies are cleared. You can also try using a different browser or device to check if the problem continues.
                    </p>
                    <p>
                        Still need help? Feel free to contact our customer support for further assistance.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CustomerCare;

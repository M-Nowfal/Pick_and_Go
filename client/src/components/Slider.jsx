import React from 'react';

const Slider = (props) => {
    return (
        <div className="offcanvas offcanvas-start bg-dark" tabIndex="-1" id="slider" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title session-loged-in text-white fs-3" id="offcanvasExampleLabel">{props.name}</h5>
                <button type="button" className="btn-close text-reset text-bg-danger" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

            </div>
        </div>
    );
}

export default Slider;
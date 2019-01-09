import React from 'react';
import { string } from 'prop-types';
import './style.css';

const Brand = ({ name }) => {
    return (
        <div className="brand-component">
            <h1>{name}</h1>
        </div>
    );
};

Brand.propTypes = {
    name : string.isRequired
};

export default Brand;

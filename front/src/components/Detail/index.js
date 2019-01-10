import React from 'react';
import { string, number, any } from 'prop-types';
import './style.css';

const Detail = ({ photo, title, price, children }) => (
    <div className="detail-component">
        <img src={photo} />
        <div>
            <p>{title}</p>
        </div>
        <div>
            <span>{price}€</span>
        </div>
        <div>{children}</div>
    </div>
);

Detail.propTypes = {
    photo    : string.isRequired,
    title    : string.isRequired,
    price    : number.isRequired,
    children : any
};

export default Detail;

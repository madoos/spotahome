import React from 'react';
import { string, number } from 'prop-types';
import './style.css';

const Card = ({ photo, title, price }) => (
    <div className="card-component">
        <div>
            <img className="photo" src={photo} />
        </div>
        <div>
            <p>{title}</p>
        </div>
        <div>
            <span>{price}€</span>
            <button>More details</button>
        </div>
    </div>
);

Card.propTypes = {
    photo : string.isRequired,
    title : string.isRequired,
    price : number.isRequired
};

export default Card;

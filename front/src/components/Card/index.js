import React from 'react';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

const Card = ({ id, photo, title, price }) => {
    return (
        <div className="card-component">
            <div>
                <img className="photo" src={photo} />
            </div>
            <div>
                <p>{title}</p>
            </div>
            <div>
                <span>{price}€</span>
                <button>
                    <Link to={`/detail/${id}`}> More details</Link>
                </button>
            </div>
        </div>
    );
};

Card.propTypes = {
    photo : string.isRequired,
    title : string.isRequired,
    price : number.isRequired,
    id    : number.isRequired
};

export default Card;

import React from 'react';
import { array } from 'prop-types';
import Card from '../Card';
import { mapComponent } from '../../utils';
import './style.css';

const CardList = ({ items }) => (
    <div className="card-list-component">{mapComponent(Card, items)}</div>
);

CardList.propTypes = {
    items : array.isRequired
};

export default CardList;

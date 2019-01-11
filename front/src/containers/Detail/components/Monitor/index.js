import React from 'react';
import { number } from 'prop-types';
import pluralize from 'pluralize';
import './style.css';

const Monitor = ({ users }) => {
    return (
        <div className="monitor-component">
            <p className="title">Book now!</p>
            <p className="message">
                there are other {users} {pluralize('person', users)} looking at
                this property
            </p>
        </div>
    );
};

Monitor.propTypes = {
    users : number.isRequired
};

export default Monitor;

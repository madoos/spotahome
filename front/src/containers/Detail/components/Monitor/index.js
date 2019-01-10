import React from 'react';
import { number } from 'prop-types';

const Monitor = ({ users }) => {
    return (
        <div className="monitor-component">
            <p>Book now!</p>
            <p>there are other {users} persons looking at this property</p>
        </div>
    );
};

Monitor.propTypes = {
    users : number.isRequired
};

export default Monitor;

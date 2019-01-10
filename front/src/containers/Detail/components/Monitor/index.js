import React from 'react';
import { number } from 'prop-types';
import pluralize from 'pluralize';

const Monitor = ({ users }) => {
    return (
        <div className="monitor-component">
            <p>Book now!</p>
            <p>
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

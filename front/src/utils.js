import { curry, merge } from 'ramda';
import React from 'react';

// mapComponent :: Component -> [Object] -> [Component]
const mapComponent = curry((Component, items) => {
    return items.map((data, i) => (
        <Component {...merge({ key : String(data.id || i) }, data)} />
    ));
});

const randomId = (limit = 100) => Math.floor(Math.random() * limit) + 1;

const omitMe = n => (n <= 0 ? 0 : n - 1);

export { mapComponent, randomId, omitMe };

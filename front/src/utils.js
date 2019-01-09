import { curry, merge } from 'ramda';
import React from 'react';

// mapComponent :: Component -> [Object] -> [Component]
const mapComponent = curry((Component, items) => {
    return items.map((data, i) => (
        <Component {...merge({ key : String(data.id || i) }, data)} />
    ));
});

export { mapComponent };

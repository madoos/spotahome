import { curry, merge } from 'ramda';
import React from 'react';

// mapComponent :: Component -> [Object] -> [Component]
const mapComponent = curry((Component, items) => {
    return items.map((data, i) => (
        <Component {...merge({ key : String(data.id || i) }, data)} />
    ));
});

const randomId = (limit = 100) => Math.floor(Math.random() * limit) + 1;

// omitMe :: Number -> Number
const omitMe = n => (n <= 0 ? 0 : n - 1);

const handleCloseTabWith = handler => {
    window.addEventListener('beforeunload', ev => {
        ev.preventDefault();
        handler();
    });
};

// renderWhen :: (a -> Boolean) -> Component -> Component | null
const renderWhen = curry((predicate, Component) => props =>
    predicate(props) ? <Component {...props} /> : null
);

export { mapComponent, randomId, omitMe, handleCloseTabWith, renderWhen };

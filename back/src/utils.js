const { curry } = require('ramda');

const asyncMapParallel = curry((f, xs) => Promise.all(xs.map(f)));

module.exports = {
    asyncMapParallel
};

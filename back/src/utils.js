const { curry, is } = require('ramda');
const { EOL } = require('os');
const asyncMapParallel = curry((f, xs) => Promise.all(xs.map(f)));

const hasError = is(Error);

const debug = curry((tag, data) => {
    process.stdout.write(tag);
    process.stdout.write(EOL);
    process.stdout.write(
        hasError(data) ? data.stack : JSON.stringify(data, null, 2)
    );
    process.stdout.write(EOL);
});

module.exports = {
    asyncMapParallel,
    debug,
    hasError
};

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

const promisifyEvent = curry(({ resolve, reject }, ee) => {
    return new Promise((res, rej) => {
        ee.on(resolve, res).on(reject, rej);
    });
});

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const concatProps = curry((props, delimiter, obj) => {
    const values = props.reduce((acc, key) => acc.concat(obj[key]), []);
    return values.join(delimiter);
});

module.exports = {
    asyncMapParallel,
    debug,
    hasError,
    promisifyEvent,
    wait,
    concatProps
};

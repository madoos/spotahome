const {
    asyncMapParallel,
    hasError,
    promisifyEvent,
    concatProps
} = require('./utils');
const EventEmitter = require('events');

test('.asyncMapParallel should map async functions', async () => {
    const asyncDouble = n => Promise.resolve(n * 2);
    const src = [1, 2, 3];
    const data = await asyncMapParallel(asyncDouble)(src);
    expect(data).toEqual([2, 4, 6]);
});

test('.isError should return true when data is instance of error', async () => {
    expect(hasError(new Error())).toEqual(true);
    expect(hasError([])).toEqual(false);
});

test('.promisifyEvent should return a promise', async () => {
    const emitter = new EventEmitter();
    setTimeout(() => emitter.emit('ready', { ok : true }), 100);

    const ready = await promisifyEvent(
        { resolve : 'ready', reject : 'error' },
        emitter
    );
    expect(ready).toEqual({ ok : true });

    try {
        setTimeout(() => emitter.emit('error', { error : true }), 100);
        await promisifyEvent({ resolve : 'ready', reject : 'error' }, emitter);
    } catch (e) {
        expect(e).toEqual({ error : true });
    }
});

test('.concatProps should concat values in a object keys', async () => {
    expect(
        concatProps(['a', 'b'], ':', { a : 'foo', b : 'baz', c : 'bla' })
    ).toEqual('foo:baz');
});

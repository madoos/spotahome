const { asyncMapParallel, hasError } = require('./utils');

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

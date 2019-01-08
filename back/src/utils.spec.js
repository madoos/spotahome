const { asyncMapParallel } = require('./utils');

test('asyncMapParallel should map async functions', async () => {
    const asyncDouble = n => Promise.resolve(n * 2);
    const src = [1, 2, 3];
    const data = await asyncMapParallel(asyncDouble)(src);
    expect(data).toEqual([2, 4, 6]);
});

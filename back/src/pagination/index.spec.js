const { paginate } = require('@pagination');
const src = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

test('Should get page one with tree items', () => {
    const data = paginate(src, 3, 1);

    expect(data).toEqual({
        data      : [1, 2, 3],
        paginator : { pageNumber : 1, count : 10, itemCountPerPage : 3, pages : 4 }
    });
});

test('Should get page two with tree items', () => {
    const data = paginate(src, 3, 2);

    expect(data).toEqual({
        data      : [4, 5, 6],
        paginator : { pageNumber : 2, count : 10, itemCountPerPage : 3, pages : 4 }
    });
});

test('Should get page tree with tree items', () => {
    const data = paginate(src, 3, 3);

    expect(data).toEqual({
        data      : [7, 8, 9],
        paginator : { pageNumber : 3, count : 10, itemCountPerPage : 3, pages : 4 }
    });
});

test('Should get page four with one items', () => {
    const data = paginate(src, 3, 4);

    expect(data).toEqual({
        data      : [10],
        paginator : { pageNumber : 4, count : 10, itemCountPerPage : 3, pages : 4 }
    });
});

test('Should get page with zero items', () => {
    expect(paginate(src, 3, 5)).toEqual({
        data      : [],
        paginator : { pageNumber : 5, count : 10, itemCountPerPage : 3, pages : 4 }
    });

    expect(paginate(src, 3, 0)).toEqual({
        data      : [],
        paginator : { pageNumber : 0, count : 10, itemCountPerPage : 3, pages : 4 }
    });
});

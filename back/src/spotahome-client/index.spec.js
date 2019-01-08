const SpotahomeClient = require('./');

const validateStructure = data =>
    expect(data).toEqual({
        id    : expect.any(Number),
        photo : expect.any(String),
        title : expect.any(String),
        price : expect.any(Number)
    });

test('Should list markets by city with default options', async () => {
    const { data, paginator } = await SpotahomeClient.homecardsByCity({
        city : 'madrid'
    });
    data.forEach(validateStructure);
    expect(paginator.pageNumber).toEqual(1);
});

test('Should list markets by city', async () => {
    const { data, paginator } = await SpotahomeClient.homecardsByCity({
        city  : 'madrid',
        page  : 2,
        items : 200
    });
    data.forEach(validateStructure);
    expect(paginator.pageNumber).toEqual(2);
});

test('Should get detail for homecard', async () => {
    const data = await SpotahomeClient.detail(280397);
    validateStructure(data);
});

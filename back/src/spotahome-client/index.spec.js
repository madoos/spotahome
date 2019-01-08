const SpotahomeClient = require('./');

const validateStructure = data =>
    expect(data).toEqual({
        id    : expect.any(Number),
        photo : expect.any(String),
        title : expect.any(String),
        price : expect.any(Number)
    });

test('Should list markets by city with default options', async () => {
    const { data, paginator } = await SpotahomeClient.homecardsByCity('madrid');
    data.forEach(validateStructure);
    expect(paginator.pageNumber).toEqual(1);
});

test('Should list markets by city', async () => {
    const { data, paginator } = await SpotahomeClient.homecardsByCity(
        'madrid',
        {
            page  : 2,
            items : 200
        }
    );
    data.forEach(validateStructure);
    expect(paginator.pageNumber).toEqual(2);
});

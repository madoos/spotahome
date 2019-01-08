const request = require('axios');
const { api } = require('@config');
const { path, map, prop } = require('ramda');
const { paginate } = require('@pagination');
const { stringify } = require('querystring');
const { projection, pipe } = require('express-flow-extensions');

const getDetails = async ids => {
    const query = stringify({ ids }, null, '[]=');
    const url = `${api.base}${api.homecards}?${query}`;
    return await request.get(url);
};

const getMarkets = city => {
    const url = `${api.base}${api.markers}/${city}`;
    return request.get(url).then(path(['data', 'data']));
};

const homecards = pipe(
    getDetails,
    path(['data', 'data', 'homecards']),
    map(
        projection({
            id    : 'id',
            photo : 'mainPhotoUrl',
            title : 'title',
            price : 'pricePerMonth'
        })
    )
);

const homecardsByCity = async ({ city, page = 1, items = 10 }) => {
    const market = await getMarkets(city);
    const { data, paginator } = paginate(market, items, page);
    const ids = map(prop('id'), data);
    const cards = await homecards(ids);
    return { data : cards, paginator };
};

module.exports = {
    homecards,
    homecardsByCity
};

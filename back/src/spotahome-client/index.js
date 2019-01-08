const request = require('axios');
const { api } = require('@config');
const { path, map, prop, unapply, ifElse, isNil, always } = require('ramda');
const { paginate } = require('@pagination');
const { stringify } = require('querystring');
const { projection, pipe } = require('express-flow-extensions');

// projectData :: {id, mainPhotoUrl, title, pricePerMonth } -> {id, photo, title, price}
const projectData = projection({
    id    : 'id',
    photo : 'mainPhotoUrl',
    title : 'title',
    price : 'pricePerMonth'
});

// getDetails :: [Number] -> Object
const getDetails = async ids => {
    const query = stringify({ ids }, null, '[]=');
    const url = `${api.base}${api.homecards}?${query}`;
    return await request.get(url);
};

// getDetails :: String -> Object
const getMarkets = city => {
    const url = `${api.base}${api.markers}/${city}`;
    return request.get(url).then(path(['data', 'data']));
};

// homecards :: [Number] -> Object
const homecards = pipe(
    getDetails,
    path(['data', 'data', 'homecards']),
    map(projectData)
);

// homecards :: Object -> Object
const homecardsByCity = async ({ city, page = 1, items = 10 }) => {
    const market = await getMarkets(city);
    const { data, paginator } = paginate(market, items, page);
    const ids = map(prop('id'), data);
    const cards = await homecards(ids);
    return { data : cards, paginator };
};

// homecards :: Number -> Object | null
const detail = pipe(
    unapply(getDetails),
    path(['data', 'data', 'homecards', 0]),
    ifElse(isNil, always(null), projectData)
);

module.exports = {
    homecards,
    homecardsByCity,
    detail
};

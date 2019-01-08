const request = require('axios');
const { api } = require('@config');
const { path } = require('ramda');
const { paginate } = require('@pagination');

const marketsByCity = async (city, opt) => {
    const url = `${api.base}${api.markers}/${city}`;
    const { page, items } = opt || { page : 1, items : 10 };
    const data = await request.get(url).then(path(['data', 'data']));
    return paginate(data, items, page);
};

module.exports = {
    marketsByCity
};

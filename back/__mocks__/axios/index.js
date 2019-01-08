const { api } = require('@config');
const marketsByCity = require('./marketsByCity.json');
const homecards = require('./homecards.json');
const resolve = data => Promise.resolve({ data });

const NOT_EXISTENT_DETAIL = '123456';

const axios = {
    get : url => {
        if (url.includes(api.markers)) {
            return resolve(marketsByCity);
        } else if (
            url.includes(NOT_EXISTENT_DETAIL) &&
            url.includes(api.homecards)
        ) {
            return resolve({ ok : true, data : [] });
        } else if (url.includes(api.homecards)) {
            return resolve(homecards);
        }
    }
};

module.exports = axios;

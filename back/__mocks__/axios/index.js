const { api } = require('@config');
const marketsByCity = require('./marketsByCity.json');
const homecards = require('./homecards.json');
const resolve = data => Promise.resolve({ data });

const axios = {
    get : url => {
        if (url.includes(api.markers)) {
            return resolve(marketsByCity);
        } else if (url.includes(api.homecards)) {
            return resolve(homecards);
        }
    }
};

module.exports = axios;

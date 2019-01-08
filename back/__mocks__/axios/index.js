const { api } = require('@config');
const marketsByCity = require('./marketsByCity.json');
const resolve = data => Promise.resolve({ data });

const axios = {
    get : url => {
        if (url.includes(api.markers)) {
            return resolve(marketsByCity);
        }
    }
};

module.exports = axios;

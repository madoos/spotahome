const config = require('@config');
const Cache = require('./cache');
const instance = Cache.createOnce({ url : config.cache.url });

module.exports = instance;

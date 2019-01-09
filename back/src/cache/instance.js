const config = require('@config');
const Cache = require('.');
const instance = Cache.createOnce({ url : config.cache.url });

module.exports = instance;

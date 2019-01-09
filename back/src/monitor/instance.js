const UserMonitor = require('@monitor');
const config = require('@config');

const monitor = UserMonitor.create({
    url : config.cache.url
});

module.exports = monitor;

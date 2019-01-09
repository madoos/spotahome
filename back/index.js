require('module-alias/register');
const config = require('@config');
const server = require('@server');
const cache = require('@cache-client');
const { debug } = require('@utils');
const monitor = require('@monitor-instance');

const start = async conf => {
    await cache.connect();
    await monitor.subscribe();
    await server.listenAsync(conf.server.port);
    return conf;
};

start(config).then(debug('Server started with config:'));

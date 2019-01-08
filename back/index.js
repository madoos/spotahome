require('module-alias/register');
const config = require('@config');
const server = require('@server');
const { debug } = require('@utils');

const start = async config => {
    await server.listenAsync(config.server.port);
    return config;
};

start(config).then(debug('Server started with config:'));

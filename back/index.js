require('module-alias/register');
const config = require('@config');
const server = require('@server');
const cache = require('@cache-client');
const { log, notify } = require('@utils');
const monitor = require('@monitor-client');
const io = require('socket.io');
const socket = io.listen(server, { origin : '*:*' });

const start = async conf => {
    await cache.connect();
    const usersConnected$ = await monitor.connect(socket);
    usersConnected$.subscribe(notify('** USER MONITOR **'));
    await server.listen(conf.server.port);
    return conf;
};

start(config).then(log('Server started with config:'));

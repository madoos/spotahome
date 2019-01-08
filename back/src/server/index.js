const server = require('./factory');
const endpoints = require('./routers');
const app = server.create({});
const config = require('@config');

app.use(config.server.baseURL, endpoints);

module.exports = app;

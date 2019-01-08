const server = require('./factory');
const endpoints = require('./routers');
const app = server.create({});

app.use('/api', endpoints);

module.exports = app;

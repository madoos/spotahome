const server = require('./factory');
const endpoints = require('./routers');
const config = require('@config');
const { join } = require('path');
const YAML = require('yamljs');
const apiDocs = YAML.load(join(__dirname, '../../swagger.yml'));

const app = server.create({
    docs : {
        path       : config.server.apiDocs,
        definition : apiDocs
    }
});

app.use(config.server.baseURL, endpoints);

module.exports = app;

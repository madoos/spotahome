const redis = require('redis');
const { promisifyEvent } = require('@utils');
const { once, identity } = require('ramda');
const { promisify } = require('util');
const { stringify, parse } = JSON;
const ONE_HOUR = 3600;

class Cache {
    constructor(opt = {}) {
        this.opt = opt;
        this.client = null;
        this.get = null;
        this.set = null;
    }

    static create(...args) {
        return new Cache(...args);
    }

    connect(url) {
        const _url = url || this.opt.url;
        this.client = redis.createClient(_url, this.opt);
        this.set = promisify(this.client.set).bind(this.client);
        this.get = promisify(this.client.get).bind(this.client);
        this.clear = promisify(this.client.flushdb).bind(this.client);
        return promisifyEvent(
            { resolve : 'ready', reject : 'error' },
            this.client
        );
    }

    close() {
        return this.client.quit();
    }

    // useWith :: (Object | String -> Object | Array ) -> (Object | String -> Object | Array )
    useWith(f, ttl = ONE_HOUR, keyHandler = identity) {
        return async param => {
            const cachedData = await this.get(keyHandler(param));
            if (cachedData) {
                return parse(cachedData);
            }
            const data = await f(param);
            await this.set(keyHandler(param), stringify(data), 'EX', ttl);
            return data;
        };
    }
}

Cache.createOnce = once(Cache.create);

module.exports = Cache;

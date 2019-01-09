const redis = require('redis-promisify');
// const io = require('socket.io');
const { stringify, parse } = JSON;

const WATCHING = 'user-watching-house';
const LEAVES = 'user-leaves-home';

class Monitor {
    constructor(options) {
        this.subscriber = redis.createClient(options);
        this.publisher = redis.createClient(options);
        this.client = redis.createClient(options);
    }

    static create(...args) {
        return new Monitor(...args);
    }

    followRequest(mapper) {
        return (req, res, next) => {
            const data = stringify(mapper(req));
            this.publisher.publish(WATCHING, data);
            next();
        };
    }

    /////////////
    subscribe() {
        const homeKey = homeId => `home:${homeId}`;

        const handler = {
            [WATCHING] : async ({ homeId, userId }) => {
                const key = homeKey(homeId);
                await this.client.saddAsync(key, userId);
                const usersWatching = await this.client.scardAsync(key);
                return usersWatching;
            },
            [LEAVES] : async ({ homeId, userId }) => {
                const key = homeKey(homeId);
                await this.client.sremAsync(key, userId);
                const usersWatching = await this.client.scardAsync(key);
                return usersWatching;
            }
        };

        this.subscriber.on('message', async (chanel, message) => {
            await handler[chanel](parse(message));
        });

        this.subscriber.subscribe(WATCHING);
        this.subscriber.subscribe(LEAVES);
    }
}

module.exports = Monitor;

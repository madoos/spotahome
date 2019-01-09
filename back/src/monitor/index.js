const redis = require('redis-promisify');
const { fromEvent, from, merge } = require('rxjs');
const { map, mergeMap, tap } = require('rxjs/operators');
const mergeObject = require('ramda').merge;

const homeKey = homeId => `home:${homeId}`;
const WATCHING_HOME = 'watching-home';
const LEAVE_HOME = 'leave-home';

class Monitor {
    constructor(options) {
        this.client = redis.createClient(options);
    }

    static create(...args) {
        return new Monitor(...args);
    }

    async connect(socket) {
        const connections$ = fromEvent(socket, 'connection');

        const watchingHomes$ = connections$.pipe(
            mergeMap(client => fromEvent(client, WATCHING_HOME)),
            mergeMap(data => from(this.addUserWatching(data))),
            map(mergeObject({ type : WATCHING_HOME })),
            tap(data => socket.emit(data.event, data))
        );

        const leaveHomes$ = connections$.pipe(
            mergeMap(client => fromEvent(client, LEAVE_HOME)),
            mergeMap(data => from(this.removeUserWatching(data))),
            map(mergeObject({ type : LEAVE_HOME })),
            tap(data => socket.emit(data.event, data))
        );

        const usersCountByHomes$ = merge(watchingHomes$, leaveHomes$);
        return usersCountByHomes$;
    }

    async removeUserWatching({ homeId, userId }) {
        const key = homeKey(homeId);
        await this.client.sremAsync(key, userId);
        const usersWatching = await this.client.scardAsync(key);
        return {
            home   : homeId,
            users  : usersWatching,
            event  : key,
            userId : userId
        };
    }

    async addUserWatching({ homeId, userId }) {
        const key = homeKey(homeId);
        await this.client.saddAsync(key, userId);
        const usersWatching = await this.client.scardAsync(key);
        return {
            home   : homeId,
            users  : usersWatching,
            event  : key,
            userId : userId
        };
    }
}

module.exports = Monitor;

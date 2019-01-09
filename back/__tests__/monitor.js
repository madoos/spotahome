const config = require('@config')
const Monitor = require('@monitor')
const {wait} = require('@utils')
const {LEAVE_HOME, WATCHING_HOME} = Monitor.events
const EventEmitter = require('events')
const {take} = require('rxjs/operators')

const monitorClient = Monitor.create({
    url : config.cache.url
})

test('Should motorize users in real time', async () => {
    const socket = new EventEmitter()
    const client = new EventEmitter()
    const data = {homeId : 129227, userId : 'US3R1D'}

    setTimeout(() => {
        socket.emit('connection', client)
        client.emit(WATCHING_HOME, data)
    }, 500)

    const connectedUsers$ = monitorClient.connect(socket)

    expect(await connectedUsers$.pipe(take(1)).toPromise()).toEqual({
        type   : 'watching-home',
        home   : 129227,
        users  : 1,
        event  : 'home:129227',
        userId : 'US3R1D'
    })

    setTimeout(() => {
        socket.emit('connection', client)
        client.emit(LEAVE_HOME, data)
    }, 500)

    expect(await connectedUsers$.pipe(take(1)).toPromise()).toEqual({
        type   : 'leave-home',
        home   : 129227,
        users  : 0,
        event  : 'home:129227',
        userId : 'US3R1D'
    })
})

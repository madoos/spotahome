const socket = window.io('http://localhost:3000');
const data = { userId : 'someuser3', homeId : 129227 };

socket.on('connect', () => {
    //socket.emit('watching-home', data)
});

socket.on('home:129227', data => console.log(data));

let i = 0;

setInterval(() => {
    console.log('----------> watching-home', i++);
    //socket.disconnect()
    socket.emit('watching-home', data);
}, 10000);

setInterval(() => {
    console.log('----------> leave-home', i++);
    //socket.disconnect()
    socket.emit('leave-home', data);
}, 5000);

const io = require('socket.io')();
const socket = {
    io: io
}

io.on('connection', socket => {
    console.log('Client Connected');

    socket.on('reject-call', data => {
        socket.broadcast.emit('reject-call', data);
    })

    socket.on('volume-action', data => {
        socket.broadcast.emit('volume-action', data);
    })
    socket.on('camera-action', data => {
        socket.broadcast.emit('camera-action', data);
    })

    socket.on('create-room', id => {
        let arrRoom = []
        socket.idRoom = id
        socket.join(id);
        for (let [id, socket] of io.of('/').sockets) {
            arrRoom.push(socket.idRoom)
        }
        if (arrRoom.length > 2) {
            arrRoom.pop()
        }
        socket.emit('list-room', arrRoom)
    })

    socket.on('join-room', data => {
        socket.join(data)
    })

    socket.on('cancel-call', data => {
        socket.broadcast.emit('cancel-call', data);
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('client-disconnect', socket.id)
    })

})

module.exports = socket;
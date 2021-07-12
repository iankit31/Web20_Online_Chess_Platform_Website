const io = require('socket.io')(3001,{
    cors : {
        origin: ["http://localhost:3000"],
    },
})

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('send-message', message => {
        console.log(message)
        socket.broadcast.emit('recieve-message',message)
    })
    socket.on('send-piece-move', (piece, x, y, px, py) => {
        let piece_move = `piece ${piece.type} is moved from (${px},${py}) to (${x},${y})`
        console.log(piece_move)
        socket.broadcast.emit('recieve-message', piece_move)
    })
    
}) 
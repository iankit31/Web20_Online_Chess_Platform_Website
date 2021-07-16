const io = require('socket.io')(3001,{
    cors : {
        origin: ["http://localhost:3000"],
    },
})

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('join',roomId =>{
        
        console.log(`${socket.id} joined room ${roomId}`)
        socket.join(roomId)
        const size = io.sockets.adapter.rooms.get(roomId).size;
        
        if(size > 2) {
            // console.log(`room ${roomId} is full`);
            socket.emit('room-full', roomId,true);
        }
        socket.on('send-pieces', pieces => {
           
            socket.to(roomId).emit('recieve-pieces', pieces)
        })
    })
 
}) 
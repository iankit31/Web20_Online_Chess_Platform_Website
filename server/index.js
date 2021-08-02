const mongoose = require('mongoose');
const Document = require('./Document');

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const io = require('socket.io')(3001,{
    cors : {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    },
})
// let temp = true;
io.on('connection', socket => {
    console.log(socket.id);
    socket.on('join',async (roomId,pieces) =>{
        
        console.log(`${socket.id} joined room ${roomId}`)
        socket.join(roomId)

        const document = await findorCreateDocument(roomId,pieces)
        // console.log(document);
        socket.emit('load-chessboard', document.data,document.chance);
        const size = io.sockets.adapter.rooms.get(roomId).size;
        // console.log(size);
         
        if(size === 1) {
            socket.emit('player-color', "white")
        }
        else if(size === 2)
        {
            socket.emit('player-color', "black")
            temp = false
        }
     
        if(size > 2) {
            // console.log(`room ${roomId} is full`);
            socket.emit('room-full', roomId,true);
        }
        socket.on('send-pieces', pieces => {
            
            socket.to(roomId).emit('recieve-pieces', pieces)
        })
        // console.log(document.data);
        socket.on("save-chessboard", async (data,chance) => {
            await Document.findByIdAndUpdate(roomId,{data},{chance});
        })
    })
 
}) 

async function findorCreateDocument(id,pieces) {
    console.log(id);
    if (id == null) 
         return ;
   
    const document = await Document.findById(id)
    // console.log("ok");
    // console.log(document);
    if (document)
             return document;
    return Document.create({ _id: id, data: pieces,chance: "white"});
}
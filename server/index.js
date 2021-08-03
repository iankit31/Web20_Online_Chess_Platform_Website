const mongoose = require('mongoose');
const Document = require('./Document');
const Users = require('./Users');

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const path = require('path');
const http = require('http');
const express = require('express');
// const socketio = require('socket.io');



const app = express();
const server = http.createServer(app);
// const io = socketio(server);

const PORT = 3002 || process.env.PORT;
// app.post('/register/create_user',(req,res)=>{
//     console.log(req);

    // const user = new Users({
    //     playerName: req.body.name,
    //     playerId: req.body.id,
    //     playerEmailId: req.body.email,
    //     playerPassword: req.body.password
    // });
    // user.save((err,user)=>{
    //     if (err) {
    //         console.log(err);
    //         return res.sendStatus(500);
    //     }
    //     return res.sendStatus(200);
    // });
// })



server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

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
const mongoose = require('mongoose');
const Document = require('./models/Document');
const Users = require('./models/Users');

const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN;
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const path = require('path');
const http = require('http');
const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
// const socketio = require('socket.io');
const cors = require('cors');




const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
// const io = socketio(server);

const PORT = 3002;
const {requireAuth,checkUser} = require('./verifyToken');
app.get('/', (req, res)=>{
    res.status(200).send("Hello");
})
 
// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.use(express.json());

// var corsOptions = {
//     origin: 'http://localhost:3000/login',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// cookies
app.use(cookieParser());
// app.use(cors(corsOptions));
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

app.get('/getuser', checkUser ,(req,res) => {
    if (res.locals.user) {
        res.send({ loggedIn: true, player: res.locals.user });
      } else {
        res.send({ loggedIn: false, player: null });
      }
})

// token 
const maxAge = 3 * 24 * 60 *60;
const createToken = (id) =>{
    return jwt.sign({id }, 'onlinechessgame', {
        expiresIn: maxAge
    });
}

// Register
app.post('/users/register', async (req, res) => {
    // res.status(200).send(req.body);

    // Validation 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const emailExist = await Users.findOne({playerEmailId: req.body.email});
    if(emailExist) {
        return res.status(400).send({
            message: 'User with this email already exists'
        });
    }

    const playerIdExist = await Users.findOne({playerId: req.body.id});
    if(playerIdExist) {
        return res.status(400).send({
            message: 'User with this userid already exists type unique userid'
        });
    }

    const user = new Users({
        playerName: req.body.name,
        playerId: req.body.id,
        playerEmailId: req.body.email,
        playerPassword: hashedPassword
    });
    try{
        // res.status(200).send(user);
        const savedUser = await user.save();
        console.log(savedUser)
        res.status(200).redirect("http://localhost:3000/");
    }catch(err){
        res.status(400).send(err);
    }
})


// login 
app.post('/users/login', checkUser, async (req, res) => {

    // Validation
    // console.log(req.body,req.body.id);
    const {id , password } = req.body;
    const user = await Users.findOne({playerId: id});

    if(!user) {
        return res.status(400).send({
            message: 'Player is does not exist'
        });
    }

    // password
    const validPassword = await bcrypt.compare(password, user.playerPassword);
    if(!validPassword) {
        return res.status(400).send({
            message: 'Password is incorrect'
        });
    }

    const token = createToken(user._id);
    res.cookie('jwt',token, { httpOnly: true, maxAge: maxAge*1000 });
    console.log(user);
    console.log('working ');
    res.status(201).redirect("http://localhost:3000/chessgame");

    // const token = jwt.sign({_id: user._id}, secret);
    // res.header('auth-token', token).send(token);     

})

app.get('/users/logout', checkUser, (req, res) => {
    console.log('logout done');
    
    res.cookie('jwt','',{maxAge: 1});
    res.redirect('http://localhost:3000/')
})
server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));



// socket connection 
const io = require('socket.io')(3001,{
    cors : {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    },
})
 
io.on('connection', socket => {
    console.log(socket.id);
    socket.on('join',async (roomId,pieces) =>{
        
        console.log(`${socket.id} joined room ${roomId}`)
        socket.join(roomId)

        const document = await findorCreateDocument(roomId,pieces)
        // console.log(document);
        socket.emit('load-chessboard', document.data, document.chance, document.black, document.white);
        const size = io.sockets.adapter.rooms.get(roomId).size;
        // console.log(size);
         
        if(size === 1) {
            if(document.white === null)
            {
                socket.emit('player-color', "white")
            }
        }
        else if(size === 2)
        {
            if(document.black === null)
            {
                socket.emit('player-color', "black")
            }
        }
     
        if(size > 2) {
            // console.log(`room ${roomId} is full`);
            socket.emit('room-full', roomId,true);
        }
        socket.on('save-my-color', async (p_email, p_color) => {
            let doc = await Document.findById(roomId);
            console.log(p_email, p_color);
            if(p_color === "black" && doc.black === null) {doc.black = p_email;}
            if(p_color === "white" && doc.white === null) {doc.white = p_email;}
            await doc.save();
        })
        socket.on('send-pieces', (pieces, opponentColor) => {
            socket.to(roomId).emit('recieve-pieces', pieces, opponentColor)
        })
        // console.log(document.data);
        socket.on('save-chessboard', async (newData, newChance, playeremail) => {
            let doc = await Document.findById(roomId);
            doc.data = newData;
            doc.chance = newChance;
            if(newChance === "white" && doc.black === null) {doc.black = playeremail;}
            if(newChance === "black" && doc.white === null) {doc.white = playeremail;}
            doc.save();
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
    return Document.create({ _id: id, data: pieces, chance: "white", black: null, white: null});
}
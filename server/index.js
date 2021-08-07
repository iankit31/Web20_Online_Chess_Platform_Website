const mongoose = require('mongoose');
const Document = require('./models/Document');
const Users = require('./models/Users');

const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN;
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () => {
    console.log("Database Connected")
});

const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
// const socketio = require('socket.io');
const cors = require('cors');




const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
// const io = socketio(server);

const { requireAuth, checkUser } = require('./verifyToken');
app.get('/', (req, res) => {
    res.status(200).send("Server Running ...");
})

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());
// app.use(cors(corsOptions));
app.use(
    cors({
        origin: [process.env.FRONTEND],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.set("trust proxy", 1);
app.get('/getuser', checkUser, (req, res) => {
    if (res.locals.user) {
        res.send({ loggedIn: true, player: res.locals.user });
    } else {
        res.send({ loggedIn: false, player: null });
    }
})

// token 
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN, {
        expiresIn: maxAge
    });
}

// Register
app.post('/users/register', async (req, res) => {

    console.log(req.body)
    // res.status(200).send(req.body);

    // Validation 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const emailExist = await Users.findOne({ playerEmailId: req.body.email });
    if (emailExist) {
        return res.status(400).send({
            message: 'User with this email already exists'
        });
    }

    const playerIdExist = await Users.findOne({ playerId: req.body.id });
    if (playerIdExist) {
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
    try {
        // res.status(200).send(user);
        const savedUser = await user.save();
        console.log(savedUser)
        res.status(200).redirect(process.env.FRONTEND);
    } catch (err) {
        console.log(err)
        res.status(400).send("Something went wrong");
    }
})


// login 
app.post('/users/login', checkUser, async (req, res) => {

    // Validation
    // console.log(req.body,req.body.id);
    const { id, password } = req.body;
    const user = await Users.findOne({ playerId: id });

    if (!user) {
        return res.status(400).send({
            message: 'Player is does not exist'
        });
    }

    // password
    const validPassword = await bcrypt.compare(password, user.playerPassword);
    if (!validPassword) {
        return res.status(400).send({
            message: 'Password is incorrect'
        });
    }

    const token = createToken(user._id);
    res.cookie('jwt', token, { 
        httpOnly: true, maxAge: maxAge * 1000,
        secure: true,
        sameSite:'none',
     });

    console.log(user);
    console.log('working ');
    res.status(201).redirect(`${process.env.FRONTEND}/chessgame`);

    // const token = jwt.sign({_id: user._id}, secret);
    // res.header('auth-token', token).send(token);     

})

app.get('/users/logout', checkUser, (req, res) => {
    console.log('logout done');

    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect(process.env.FRONTEND)
})
http.listen(process.env.PORT, () => console.log(`Server Running on port ${process.env.PORT}`));



// socket connection 
const io = require('socket.io')(http, {
    cors: {
        origin: [process.env.FRONTEND],
        methods: ["GET", "POST"]
    },
})

io.on('connection', socket => {
    socket.on('join', async (roomId, pieces) => {

        console.log(`${socket.id} joined room ${roomId}`)
        socket.join(roomId)

        const document = await findorCreateDocument(roomId, pieces)
        // console.log(document);
        socket.emit('load-chessboard', document.data, document.chance, document.black, document.white);
        const size = io.sockets.adapter.rooms.get(roomId).size;
        // console.log(size);

        if (size === 1) {
            if (document.white === null) {
                socket.emit('player-color', "white")
            }
        }
        else if (size === 2) {
            if (document.black === null) {
                socket.emit('player-color', "black")
            }
        }

        if (size > 2) {
            // console.log(`room ${roomId} is full`);
            socket.emit('room-full', roomId, true);
        }
        socket.on('save-my-color', async (p_email, p_color) => {
            let doc = await Document.findById(roomId);
            console.log(p_email, p_color);
            if (p_color === "black" && doc.black === null) { doc.black = p_email; }
            if (p_color === "white" && doc.white === null) { doc.white = p_email; }
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
            if (newChance === "white" && doc.black === null) { doc.black = playeremail; }
            if (newChance === "black" && doc.white === null) { doc.white = playeremail; }
            doc.save();
        })

        socket.on("game-end", async (event, loseColor) => {

            console.log(event, loseColor);
            
            let doc = await Document.findById(roomId);
            if(event === "stalemate") {
                doc.delete();
                socket.to(roomId).emit("receive-updates", event, loseColor);
                return;
            }
            let blackUserInfo = await Users.findOne({ playerEmailId: doc.black });
            let whiteUserInfo = await Users.findOne({ playerEmailId: doc.white });
           
            if (loseColor === "white") {
                whiteUserInfo.playerRating = whiteUserInfo.playerRating - 10;
                blackUserInfo.playerRating = blackUserInfo.playerRating + 10;
            }
            else {
                whiteUserInfo.playerRating = whiteUserInfo.playerRating + 10;
                blackUserInfo.playerRating = blackUserInfo.playerRating - 10;
            }
            await whiteUserInfo.save();
            await blackUserInfo.save();
            doc.delete();

            socket.to(roomId).emit("receive-updates", event, loseColor);
        })
    })

})

async function findorCreateDocument(id, pieces) {
    console.log(id);
    if (id == null)
        return;

    const document = await Document.findById(id)
    // console.log("ok");
    // console.log(document);
    if (document)
        return document;
    return Document.create({ _id: id, data: pieces, chance: "white", black: null, white: null });
}
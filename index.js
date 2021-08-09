const express = require('express');
const mongoose = require('mongoose');

const Document = require('./models/Document');
const Users = require('./models/Users');

const app = express();
const path = require('path');
const http = require('http').createServer(app);
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const jwt = require('jsonwebtoken');
const { requireAuth, checkUser } = require('./verifyToken');

// MongoDB Connection
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () => {
    console.log("Database Connected")
});


// root server for testing
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
app.use(cors());

app.set("trust proxy", 1);

// Get User detail
app.post('/getuser', (req, res) => {

    const token = req.body.jwtToken;

    if (token) {
        jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.json({
                    user: null,
                    msg: 'not-verified'
                })
            }
            else {
                console.log(decodedToken);
                let user = await Users.findById(decodedToken.id);
                res.json({
                    user: user,
                    msg: 'verified'
                })
            }
        });
    }
    else {
        res.json({
            user: null,
            msg: 'not-verified'
        })
    }
})

// Creating Token 
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN, {
        expiresIn: maxAge
    });
}

// Register user
app.post('/users/register', async (req, res) => {

    console.log(req.body)
    
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
        const savedUser = await user.save();
        console.log(savedUser)
        res.status(200).redirect(process.env.FRONTEND);
    } catch (err) {
        console.log(err)
        res.status(400).send("Something went wrong");
    }
})


// login user
app.post('/users/login', async (req, res) => {

    
    const { id, password } = req.body;
    const user = await Users.findOne({ playerId: id });

    if (!user) {
        return res.json({
            msg: 'nologsuc'
        })
    }

    // password 
    const validPassword = await bcrypt.compare(password, user.playerPassword);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Password is incorrect'
        });
    }


    const token = createToken(user._id);
    res.cookie('jwt', token, {
        httpOnly: true, maxAge: maxAge * 1000,
        secure: true,
        sameSite: 'none',
    });

    res.json({
        token,
        user,
        msg: 'logsuc'
    })
})

// Delete Chessboard
app.post('/deleteboard', (req, res) => {

    const token = req.body.jwtToken;

    if (token) {
        jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(400);
            }
            else {
                console.log(decodedToken);
                const room = req.body.roomId;
                let board = await Document.findById(room);
                board.delete();
                res.status(200);
            }
        });
    }
    else {
        res.status(400);
    }
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
        
        socket.emit('load-chessboard', document.data, document.chance, document.black, document.white);

        // size of Room
        const size = io.sockets.adapter.rooms.get(roomId).size;
       
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
            socket.emit('room-full', roomId, true);
        }

        // Saving player color on reload 
        socket.on('save-my-color', async (p_email, p_color) => {
            let doc = await Document.findById(roomId);
            console.log(p_email, p_color);
            if (p_color === "black" && doc.black === null) { doc.black = p_email; }
            if (p_color === "white" && doc.white === null) { doc.white = p_email; }
            await doc.save();
        })

        // Sending movement Pieces to Other Player
        socket.on('send-pieces', (pieces, opponentColor) => {
            socket.to(roomId).emit('recieve-pieces', pieces, opponentColor)
        })

        // Saving Pieces on Chessboard 
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
            let blackUserInfo = await Users.findOne({ playerEmailId: doc.black });
            let whiteUserInfo = await Users.findOne({ playerEmailId: doc.white });

            if (loseColor === "white") {
                console.log('loseColor', loseColor);
                whiteUserInfo.playerRating = whiteUserInfo.playerRating - 10;
                blackUserInfo.playerRating = blackUserInfo.playerRating + 10;
            }
            else {

                console.log('loseColor',loseColor);
                whiteUserInfo.playerRating = whiteUserInfo.playerRating + 10;
                blackUserInfo.playerRating = blackUserInfo.playerRating - 10;
            }
            console.log('above save info');
            await whiteUserInfo.save();
            await blackUserInfo.save();
            console.log('above doc delete');
            await doc.delete();

            await socket.to(roomId).emit("receive-updates", event, loseColor);
        })

        socket.on("game-end-stalemate", async (event, loseColor) => {

            console.log(event, loseColor);

            let doc = await Document.findById(roomId);
            await doc.delete();
            await socket.to(roomId).emit("receive-updates", event, loseColor);
        })

        socket.on('user-left', () => {
            socket.to(roomId).emit('opponent-left');
        })

        socket.on('send-opponent-info',(user) => {
            socket.to(roomId).emit('recieve-opponent-info', user);
        })
    })

})

async function findorCreateDocument(id, pieces) {
    console.log(id);
    if (id == null)
        return;

    const document = await Document.findById(id);
    if (document)
        return document;
    return Document.create({ _id: id, data: pieces, chance: "white", black: null, white: null });
}

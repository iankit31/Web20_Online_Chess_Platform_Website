const {Schema, model} = require('mongoose');
const { isEmail }  = require('validator');

const Users = new Schema({
    playerName: {
        type: String,
        required: [true, 'please enter your name']
    },
    playerId: {
        type: String,
        unique: [true, 'Please enter a unique playerid'],
        required: true
    },
    playerEmailId: {
        type: String,
        required: true,
        lowercase: true,
        validate: [isEmail ,'Email is not valid'], 
    },
    playerPassword: {
        type: String, 
        minlength: [6, 'Password must be at least 6 characters long'],
        required: [true, 'Please enter a password']
    },
    playerRating: {
        type: Number, 
        default: 1200
    }
})

module.exports = model('Users', Users);
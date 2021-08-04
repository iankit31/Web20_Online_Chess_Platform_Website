const {Schema, model} = require('mongoose');

const Users = new Schema({
    playerName: {
        type: String,
        required: true
    },
    playerId: {
        type: String,
        required: true
    },
    playerEmailId: {
        type: String,
        required: true
    },
    playerPassword: {
        type: String, 
        required: true
    },
    playerRating: {
        type: Number, 
        default: 1200
    }
})

module.exports = model('Users', Users);
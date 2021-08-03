const {Schema, model} = require('mongoose');

const Users = new Schema({
    playerName: String,
    playerId: String,
    playerEmailId: String,
    playerPassword: String,
    playerRating: Number,
})

module.exports = model('Users', Users);
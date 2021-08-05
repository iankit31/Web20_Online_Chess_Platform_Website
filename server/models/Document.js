const {Schema, model} = require('mongoose');


const Document = new Schema({
    _id: String,
    data: Object,
    chance: String,
    black: String,
    white: String
})

module.exports = model('Document', Document);
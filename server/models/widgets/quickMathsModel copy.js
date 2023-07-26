const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quickmaths = new Schema({
    gameID: {
        type: String,
        required: true,
    },
    teamOne: {
        type: Number,
        required: true,
    },
    teamTwo: {
        type: Number,
        required: true,
    },
});

// Second value needs to match the database value. That's how the connection is made
module.exports = mongoose.model('QuickMath', quickmaths);

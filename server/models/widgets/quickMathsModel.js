const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new Schema({
    name: {
        type: String,
        required: true,
    },
    team: {
        type: Number,
        required: true,
        default: 1,
    },
    ready: {
        type: Boolean,
        required: true,
        default: false,
    },
    host: {
        type: Boolean,
        required: true,
        default: false,
    },
    score: {
        type: Number,
        default: 0,
    },
});

const quickmaths = new Schema({
    code: {
        type: String,
        required: true,
    },
    players: {
        type: [Player],
        required: true,
        default: [],
    },
    gameReady: {
        type: Boolean,
        default: false,
    },
    // Settings | FUTURE - Put this in an object? Idk
    settingsTime: {
        type: Number,
        default: 60,
    },
    settingsNumberOfTeams: {
        type: Number,
        default: 2,
    },
    settingsDifficulty: {
        type: Number,
        default: 1,
    },
});

// Second value needs to match the database value. That's how the connection is made
module.exports = mongoose.model('QuickMath', quickmaths);

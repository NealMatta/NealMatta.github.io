const express = require('express');

const {
    getScores,
    updateCampScores,
    resetCampScores,
    createNewMathGame,
} = require('../controllers/quickMathsController');

const quickMathRoutes = express.Router();

// FUTURE - I made these specifcally for camp. I'll eventually need to bring in game ID or something

// Grab score from CAMP game
quickMathRoutes.get('/getScores', getScores);

// Modify score from CAMP game
quickMathRoutes.patch('/updateCampScores', updateCampScores);

// Reset scores from CAMP game
quickMathRoutes.patch('/resetCampScores', resetCampScores);

// Create new game
quickMathRoutes.post('/createNewGame', createNewMathGame);

module.exports = quickMathRoutes;

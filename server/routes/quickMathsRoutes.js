const express = require('express');

const {
    getScores,
    updateCampScores,
    resetCampScores,
    createNewMathGame,
    deleteMathGame,
} = require('../controllers/quickMathsController');

const quickMathRoutes = express.Router();

// // Grab score from CAMP game
// quickMathRoutes.get('/getScores', getScores);

// // Modify score from CAMP game
// quickMathRoutes.patch('/updateCampScores', updateCampScores);

// // Reset scores from CAMP game
// quickMathRoutes.patch('/resetCampScores', resetCampScores);

// Create new game
quickMathRoutes.post('/createNewGame', createNewMathGame);

// Get Game Status

// Initialize Game

// Get Score

// Delete Game
quickMathRoutes.delete('/delete/:gameCode', deleteMathGame);

module.exports = quickMathRoutes;

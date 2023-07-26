const express = require('express');

const {
    getScores,
    updateCampScores,
    resetCampScores,
    createNewMathGame,
    deleteMathGame,
    getGameStatus,
    addPlayer,
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
quickMathRoutes.get('/:gameCode/gameStatus', getGameStatus);

// Add player
quickMathRoutes.patch('/:gameCode/addPlayer', addPlayer);

// Initialize Game
// quickMathRoutes.patch('/:gameCode/initialize', );

// Get Final Score
// quickMathRoutes.get('/:gameCode/getScore', );

// Delete Game
quickMathRoutes.delete('/delete/:gameCode', deleteMathGame);

module.exports = quickMathRoutes;

const express = require('express');

const {
    createNewMathGame,
    deleteMathGame,
    getGameStatus,
    addPlayer,
    initializeGame,
} = require('../controllers/quickMathsController');

const quickMathRoutes = express.Router();

// Create new game
quickMathRoutes.post('/createNewGame', createNewMathGame);

// Get Game Status
quickMathRoutes.get('/:gameCode/gameStatus', getGameStatus);

// Add player
quickMathRoutes.patch('/:gameCode/addPlayer', addPlayer);

// Initialize Game
quickMathRoutes.patch('/:gameCode/initialize', initializeGame);

// Get Final Score
// quickMathRoutes.get('/:gameCode/getScore', getScore);

// Delete Game
quickMathRoutes.delete('/delete/:gameCode', deleteMathGame);

module.exports = quickMathRoutes;

const mongoose = require('mongoose');
const QuickMath = require('../models/widgets/quickMathsModel');

// HELPER FUNCTIONS

// ROUTES
// FUTURE - Figure out proper status codes to respond
const createNewMathGame = async (req, res) => {
    const { gameCode } = req.body;
    try {
        const newGame = await QuickMath.create({
            code: gameCode,
        });
        return res.status(201).json(newGame._id);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteMathGame = async (req, res) => {
    const { gameCode } = req.params;
    try {
        const deleting = await QuickMath.findOneAndDelete({
            code: gameCode,
        });
        return res.status(200).json(deleting._id);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getGameStatus = async (req, res) => {
    const { gameCode } = req.params;

    try {
        // let payload = [];
        // Grabbing Game
        const game = await QuickMath.findOne({ code: gameCode });
        let payload = { gameReady: game.gameReady };
        return res.status(200).json(payload);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const addPlayer = async (req, res) => {
    const { gameCode } = req.params;
    const { name, host } = req.body;

    const query = { code: gameCode };
    const pushVal = { name: name, host: host };

    try {
        await QuickMath.findOneAndUpdate(query, {
            $push: { players: pushVal },
        });
        return res.status(200).json(`Added Player: ${name}`);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const initializeGame = async (req, res) => {
    const { gameCode } = req.params;

    const query = { code: gameCode };
    const pushVal = { gameReady: true };

    try {
        await QuickMath.findOneAndUpdate(query, pushVal);
        return res.status(200).json(`Game Ready`);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getScore = async (req, res) => {
    const { gameCode } = req.params;

    try {
        const game = await QuickMath.findOne({ code: gameCode });

        // Setting all teams to 0
        let teams = {};
        for (let step = 1; step <= game.settingsNumberOfTeams; step++) {
            teams[`Team ${step}`] = 0;
        }

        // Error handling to check that there is a team to iterate through
        if (!game.players.length) {
            return res.status(200).json(`No Teams!`);
        }
        // Iterating through players
        game.players.map(player => {
            teams[`Team ${player.team}`] += player.score;
        });

        return res.status(200).json(teams);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const joinGame = async (req, res) => {
    const { gameCode } = req.params;

    try {
        const game = await QuickMath.findOne({ code: gameCode });

        let payload = {};
        payload[numberOfTeams] = game.settingsNumberOfTeams;

        return res.status(200).json(payload);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getTeams = async (req, res) => {
    const { gameCode } = req.params;

    try {
        const game = await QuickMath.findOne({ code: gameCode });

        // Setting all teams to 0
        let teams = {};
        for (let step = 1; step <= game.settingsNumberOfTeams; step++) {
            teams[`Team ${step}`] = [];
        }

        // Error handling to check that there is a team to iterate through
        if (!game.players.length) {
            return res.status(200).json(`No Teams!`);
        }

        // Iterating through players and assigning them to a team
        game.players.map(player => {
            teams[`Team ${player.team}`].push(player.name);
        });

        return res.status(200).json(teams);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createNewMathGame,
    deleteMathGame,
    getGameStatus,
    addPlayer,
    initializeGame,
    getScore,
    joinGame,
    getTeams,
};

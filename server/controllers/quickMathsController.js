const mongoose = require('mongoose');
const QuickMath = require('../models/widgets/quickMathsModel');

const getScores = async (req, res) => {
    try {
        let payload = [];

        // I'll want to eventually change out game ID with one automatically
        const game = await QuickMath.findOne({ gameID: 'CAMP' });

        let temp = {};
        temp['teamOne'] = game.teamOne;
        temp['teamTwo'] = game.teamTwo;
        payload.push(temp);

        return res.status(200).json(payload);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updateCampScores = async (req, res) => {
    const { teamToUpdate, scoreToUpdate } = req.body;

    const query = { gameID: 'CAMP' };
    let pushVal = {};
    teamToUpdate === 'teamOne'
        ? (pushVal.teamOne = scoreToUpdate)
        : (pushVal.teamTwo = scoreToUpdate);

    try {
        await QuickMath.findOneAndUpdate(query, pushVal);
        return res.status(200).json(`Updated Scores`);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const resetCampScores = async (req, res) => {
    const query = { gameID: 'CAMP' };
    const pushVal = { teamOne: 0, teamTwo: 0 };

    try {
        // Deletes that specific value from the personal widgets array
        await QuickMath.findOneAndUpdate(query, pushVal);
        return res.status(200).json(`Updated Scores`);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const createNewMathGame = async (req, res) => {
    const { gameCode } = req.body;
    try {
        const newGame = await QuickMath.create({
            code: gameCode,
        });
        return res.status(200).json(newGame._id);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getScores,
    updateCampScores,
    resetCampScores,
    createNewMathGame,
};

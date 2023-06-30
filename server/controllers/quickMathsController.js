const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const QuickMath = require('../models/widgets/quickMathsModel');
const Widget = require('../models/widgetsModel');

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
    const query = { gameID: 'CAMP' };
    const pushVal = { teamOne: 2, teamTwo: 3 };

    try {
        // Deletes that specific value from the personal widgets array
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

module.exports = { getScores, updateCampScores, resetCampScores };

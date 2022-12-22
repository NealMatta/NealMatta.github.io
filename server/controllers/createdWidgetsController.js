const CreatedWidgets = require('../models/createdWidgetsModel');
const mongoose = require('mongoose');

const getOneWidget = async (req, res) => {
    res.json({ mssg: 'GET all Widgets' });
};

const insertCreatedWidget = async (req, res) => {
    const { uid, createdWidget, widgetConfig, widgetModel } = req.body;
    try {
        const newWidget = await CreatedWidgets.create({
            uid,
            createdWidget,
            widgetConfig,
            widgetModel,
        });
        return res.status(200).json(newWidget);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { getOneWidget, insertCreatedWidget };

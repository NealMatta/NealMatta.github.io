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
        return res.status(200).json(newWidget._id);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteCreatedWidget = async (req, res) => {
    const { id } = req.params;

    try {
        // FUTURE - Do I need to store this as a variable?
        const deleting = await CreatedWidgets.findOneAndDelete({
            createdWidget: id,
        });
        // FUTURE - Do I need to send anything back?
        return res.status(200).json([]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { getOneWidget, insertCreatedWidget, deleteCreatedWidget };

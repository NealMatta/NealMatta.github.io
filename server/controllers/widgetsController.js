const Widget = require('../models/widgetsModel');

// Get all Widgets
const getAllWidgets = async (req, res) => {
    res.json({ mssg: 'GET all Widgets' });
};

// Get one widget
const getOneWidget = async (req, res) => {
    res.json({ mssg: 'GET a SINGLE Widget' });
};

// Create new widget
const createNewWidget = async (req, res) => {
    const {
        widgetName,
        widgetDatabase,
        live,
        difficultyToCreate,
        widgetDetails,
    } = req.body;
    try {
        const widget = await Widget.create({
            widgetName,
            widgetDatabase,
            live,
            difficultyToCreate,
            widgetDetails,
        });
        return res.status(200).json(widget);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Delete a widget
const deleteAWidget = async (req, res) => {
    res.json({ mssg: 'DELETE a Widget' });
};

// Update a widget
const updateAWidget = async (req, res) => {
    res.json({ mssg: 'UPDATE a Widget' });
};

module.exports = {
    getAllWidgets,
    getOneWidget,
    createNewWidget,
    deleteAWidget,
    updateAWidget,
};

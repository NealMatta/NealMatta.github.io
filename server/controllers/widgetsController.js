const Widget = require('../models/widgetsModel');

// Get all live widgets
const getActiveWidgets = async (req, res) => {
    try {
        const activeWidgets = await Widget.find({ live: true }).sort({
            // Sorting Alphabetically
            widgetName: 1,
        });
        res.status(200).json(activeWidgets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all inactive widgets
const getInactiveWidgets = async (req, res) => {
    try {
        const inactiveWidgets = await Widget.find({ live: false }).sort({
            // Sorting Alphabetically
            widgetName: 1,
        });
        res.status(200).json(inactiveWidgets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/* Create brand new widget
    - Current use is for testing but can eventually 
    create an admin page to add more widgets */
const createNewWidget = async (req, res) => {
    const {
        widgetDefaultName,
        widgetRoute,
        live,
        difficultyToCreate,
        widgetDetails,
    } = req.body;
    try {
        const widget = await Widget.create({
            widgetDefaultName,
            widgetRoute,
            live,
            difficultyToCreate,
            widgetDetails,
        });
        return res.status(200).json(widget);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getActiveWidgets,
    getInactiveWidgets,
    createNewWidget,
};

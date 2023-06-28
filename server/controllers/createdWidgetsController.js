const CreatedWidgets = require('../models/createdWidgetsModel');
const mongoose = require('mongoose');

// Grabs an instance by using the Personal Widget ID
const getOneWidgetByPersonalWidgetID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Created Widget' });
    }

    const createdWidget = await CreatedWidgets.find({ createdWidget: id });

    if (!createdWidget) {
        return res.status(404).json({ error: 'No such Created Widget' });
    }

    return res.status(200).json(createdWidget);
};

const insertCreatedWidget = async (req, res) => {
    // FUTURE - Don't pass in UID but rather pull it from the headers?
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
        return res.status(200).json(deleting._id);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getOneWidgetByPersonalWidgetID,
    insertCreatedWidget,
    deleteCreatedWidget,
};

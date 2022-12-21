const User = require('../models/userModel');
const CreatedWidgets = require('../models/createdWidgetsModel');
const mongoose = require('mongoose');

// Create new User
const createNewUser = async (req, res) => {
    const { uid, name, email, personalWidgets, paidUser } = req.body;
    try {
        const user = await User.create({
            uid,
            name,
            email,
            personalWidgets,
            paidUser,
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Set all personal widgets and then return it
const getAllPersonalWidgets = async (req, res) => {
    // Need to check if the personal widgets are already populated
    // Replace Personal Widget ID with Created Widgets
    // Replace Widget Config with the All Widgets Values
    // Only Widget Name and Widget Details are needed
    // Replcate Personal Widget ID with the Created Widget Configurations

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such User' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ error: 'No such User' });
    }

    // FUTURE: Filtering out specific values. May help speed?
    const populatedValues = await User.findById(id).populate({
        path: 'personalWidgets',
        populate: {
            path: 'widgetConfig createdWidget',
        },
    });

    let payload = [];
    // console.log(populatedValues);

    populatedValues.personalWidgets.forEach(widget => {
        let temp = {};
        temp['widgetConfig'] = widget.widgetConfig;
        temp['createdWidget'] = widget.createdWidget;
        payload.push(temp);
    });

    return res.status(200).json(payload);
};
module.exports = { createNewUser, getAllPersonalWidgets };

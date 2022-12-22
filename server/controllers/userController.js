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

// Add a new widget to the personal widgets
const deleteOnePersonalWidget = async (req, res) => {
    const { id } = req.params;

    // FUTURE - Error handling to ensure id that is added is able to be transformed
    const transformedId = mongoose.Types.ObjectId(id);

    // FUTURE - This UID will be grabbed dynamically via Firebase
    const query = { uid: '123' };
    const pushVal = { personalWidgets: transformedId };

    try {
        await User.findOneAndUpdate(query, {
            $pull: pushVal,
        });
        return res.status(200).json("Removed from User's Personal Widgets");
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    return res.status(200).json("Added to User's Personal Widgets");
};

// Add a new widget to the personal widgets
const addNewPersonalWidget = async (req, res) => {
    const { idToAdd } = req.body;

    // FUTURE - Error handling to ensure id that is added is able to be transformed
    const transformedId = mongoose.Types.ObjectId(idToAdd);

    console.log(idToAdd);
    console.log(transformedId);

    // FUTURE - This UID will be grabbed dynamically via Firebase
    const query = { uid: '123' };
    const pushVal = { personalWidgets: transformedId };

    try {
        const response = await User.findOneAndUpdate(query, {
            $push: pushVal,
        });
        return res.status(200).json("Added to User's Personal Widgets");
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

    // ID Will need to be changed to UID
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
module.exports = {
    createNewUser,
    getAllPersonalWidgets,
    addNewPersonalWidget,
    deleteOnePersonalWidget,
};

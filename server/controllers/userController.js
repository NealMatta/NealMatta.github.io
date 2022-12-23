const User = require('../models/userModel');
const CreatedWidgets = require('../models/createdWidgetsModel');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id) {
    if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id)) === id) return true;
        return false;
    }
    return false;
}

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

// Delete a widget from the personal widgets array
const deleteOnePersonalWidget = async (req, res) => {
    const { id } = req.params;

    // FUTURE - Make it more user friendly (?)
    // Error handling to ensure id that is added is able to be transformed
    if (!isValidObjectId(id))
        return res.status(404).json({ error: 'Not a valid ID' });

    const transformedId = mongoose.Types.ObjectId(id);

    // FUTURE - This UID will be grabbed dynamically via Firebase
    const query = { uid: '123' };
    const pushVal = { personalWidgets: transformedId };

    try {
        // Deletes that specific value from the personal widgets array
        await User.findOneAndUpdate(query, {
            $pull: pushVal,
        });
        return res.status(200).json(`Removed from User's Personal Widgets`);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Add a new widget to the personal widgets
const addNewPersonalWidget = async (req, res) => {
    const { idToAdd } = req.body;

    // FUTURE - Make it more user friendly (?)
    // Error handling to ensure id that is added is able to be transformed
    if (!isValidObjectId(idToAdd))
        return res.status(404).json({ error: 'Not a valid ID' });

    const transformedId = mongoose.Types.ObjectId(idToAdd);

    // FUTURE - This UID will be grabbed dynamically via Firebase
    const query = { uid: '123' };
    const pushVal = { personalWidgets: transformedId };

    try {
        // Added the id to the user's personal widgets array
        await User.findOneAndUpdate(query, {
            $push: pushVal,
        });
        return res.status(200).json("Added to User's Personal Widgets");
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Set all personal widgets and then return it
const getAllPersonalWidgets = async (req, res) => {
    try {
        let payload = [];

        const user = await User.findOne({ uid: '123' });
        // FUTURE: Filtering out specific values. May help speed?

        /* Replace Personal Widget ID with Created Widgets + 
           Replace Widget Config with the All Widgets Values */
        const populatedValues = await user.populate({
            path: 'personalWidgets',
            populate: {
                path: 'widgetConfig createdWidget',
            },
        });

        // FUTURE - Check if values were populated
        populatedValues.personalWidgets.forEach(widget => {
            let temp = {};
            temp['widgetConfig'] = widget.widgetConfig;
            temp['createdWidget'] = widget.createdWidget;
            payload.push(temp);
        });
        return res.status(200).json(payload);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
module.exports = {
    createNewUser,
    getAllPersonalWidgets,
    addNewPersonalWidget,
    deleteOnePersonalWidget,
};

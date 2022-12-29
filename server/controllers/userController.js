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
    const auth = req.firebaseAuth;

    // FUTURE - Make it more user friendly (?)
    // Error handling to ensure id that is added is able to be transformed
    if (!isValidObjectId(id))
        return res.status(404).json({ error: 'Not a valid ID' });

    const transformedId = mongoose.Types.ObjectId(id);

    const query = { uid: auth.uid };
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
    const auth = req.firebaseAuth;

    // FUTURE - Make it more user friendly (?)
    // Error handling to ensure id that is added is able to be transformed
    if (!isValidObjectId(idToAdd))
        return res.status(404).json({ error: 'Not a valid ID' });

    const transformedId = mongoose.Types.ObjectId(idToAdd);

    const query = { uid: auth.uid };
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

// FUTURE - Rename this function to Populate or something
// Set all personal widgets and then return it
const getAllPersonalWidgets = async (req, res) => {
    const auth = req.firebaseAuth;

    try {
        let payload = [];

        const user = await User.findOne({ uid: auth.uid });
        // FUTURE: Filtering out specific values. May help speed?

        /* Replace Personal Widget ID with Created Widgets + 
           Replace Widget Config with the All Widgets Values */
        const populatedValues = await user.populate({
            path: 'personalWidgets',
            populate: {
                path: 'widgetConfig createdWidget',
            },
        });

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

// FUTURE - Explain where this is used
const comparePersonalWidgets = async (req, res) => {
    /* Using auth, I get the UID of the currently logged in User and iterate through
    the personal widgets array to check if the selected value exists. If it does, all is 
    good. If it doesn't, then I throw a fit*/

    const { id } = req.params;
    const auth = req.firebaseAuth;

    try {
        // FUTURE - Need error handling here
        const user = await User.findOne({ uid: auth.uid });

        const validConfiguration = user.personalWidgets.includes(id);

        return res.status(200).json(validConfiguration);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
module.exports = {
    createNewUser,
    getAllPersonalWidgets,
    addNewPersonalWidget,
    deleteOnePersonalWidget,
    comparePersonalWidgets,
};

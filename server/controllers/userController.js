const { User, PersonalWidgets } = require('../models/userModel');
// const PersonalWidgets = require('../models/userModel');

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

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such User' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ error: 'No such User' });
    }

    // Iterate through all personal widgets
    // Grab the ID, find the value by ID, and populate it

    user.personalWidgets.map(personalWidget => {
        // console.log(personalWidget._id);
        // 63a0e6993959a660074cf73b
        // const test = PersonalWidgets.findById(personalWidget._id).populate(
        //     'wid'
        // );
        const test = PersonalWidgets.find().populate('wid');
        console.log(test[0]);
    });

    // const test = user.personalWidgets.populate('wid');
    console.log(user.personalWidgets);

    return res.status(200).json(user.personalWidgets);
};
module.exports = { createNewUser, getAllPersonalWidgets };

const User = require('../models/userModel');

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
module.exports = { createNewUser };

const express = require('express');
const User = require('../models/userModel');

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

// This section will help you get a list of all the records.
userRoutes.get('/', (req, res) => {
    res.json({ mssg: 'GET all Users' });
});

userRoutes.get('/:id', (req, res) => {
    res.json({ mssg: 'GET a SINGLE User' });
});

userRoutes.post('/', async (req, res) => {
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
    // res.json({ mssg: 'POST all Users' });
});

userRoutes.delete('/:id', (req, res) => {
    res.json({ mssg: 'DELETE a User' });
});

userRoutes.patch('/:id', (req, res) => {
    res.json({ mssg: 'UPDATE a User' });
});

module.exports = userRoutes;

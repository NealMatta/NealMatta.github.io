const express = require('express');
// const User = require('../models/userModel');
const {
    createNewUser,
    getAllPersonalWidgets,
} = require('../controllers/userController');

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

// This section will help you get a list of all the records.
userRoutes.get('/', (req, res) => {
    res.json({ mssg: 'GET all Users' });
});

// Get all personal widgets
userRoutes.get('/personalWidgets/:id', getAllPersonalWidgets);

userRoutes.post('/', createNewUser);

userRoutes.delete('/:id', (req, res) => {
    res.json({ mssg: 'DELETE a User' });
});

userRoutes.patch('/:id', (req, res) => {
    res.json({ mssg: 'UPDATE a User' });
});

module.exports = userRoutes;

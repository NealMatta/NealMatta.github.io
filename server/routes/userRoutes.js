const express = require('express');
// const User = require('../models/userModel');
const {
    createNewUser,
    getAllPersonalWidgets,
    addNewPersonalWidget,
    deleteOnePersonalWidget,
} = require('../controllers/userController');

const userRoutes = express.Router();

// FUTURE - Don't think I'll need to take in an ID
// Get all personal widgets
userRoutes.get('/personalWidgets', getAllPersonalWidgets);

// Add New value to personal widgets array
userRoutes.patch('/personalWidgets/add', addNewPersonalWidget);

// Delete One value of personal widgets array
userRoutes.patch('/personalWidgets/deleteOne/:id', deleteOnePersonalWidget);

userRoutes.post('/', createNewUser);

module.exports = userRoutes;

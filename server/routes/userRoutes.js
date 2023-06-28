const express = require('express');

const {
    createNewUser,
    getAllPersonalWidgets,
    addNewPersonalWidget,
    deleteOnePersonalWidget,
    comparePersonalWidgets,
} = require('../controllers/userController');

const userRoutes = express.Router();

// Get all personal widgets
userRoutes.get('/personalWidgets', getAllPersonalWidgets);

// Add New value to personal widgets array
userRoutes.patch('/personalWidgets/add', addNewPersonalWidget);

// Delete One value of personal widgets array
userRoutes.patch('/personalWidgets/deleteOne/:id', deleteOnePersonalWidget);

// Checks to see if the personal widget passed in exists in the user's array
userRoutes.get('/personalWidgets/validate/:id', comparePersonalWidgets);

userRoutes.post('/', createNewUser);

module.exports = userRoutes;

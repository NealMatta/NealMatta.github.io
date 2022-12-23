const express = require('express');

const {
    createNewUser,
    getAllPersonalWidgets,
    addNewPersonalWidget,
    deleteOnePersonalWidget,
} = require('../controllers/userController');

const userRoutes = express.Router();

// Get all personal widgets
userRoutes.get('/personalWidgets', getAllPersonalWidgets);

// Add New value to personal widgets array
userRoutes.patch('/personalWidgets/add', addNewPersonalWidget);

// Delete One value of personal widgets array
userRoutes.patch('/personalWidgets/deleteOne/:id', deleteOnePersonalWidget);

userRoutes.post('/', createNewUser);

module.exports = userRoutes;

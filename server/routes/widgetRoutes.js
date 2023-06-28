const express = require('express');
const {
    createNewWidget,
    getActiveWidgets,
    getInactiveWidgets,
} = require('../controllers/widgetsController');

// The router will be added as a middleware and will take control of requests starting with path /record.
const widgetRoutes = express.Router();

widgetRoutes.get('/active', getActiveWidgets);

widgetRoutes.get('/inactive', getInactiveWidgets);

widgetRoutes.post('/', createNewWidget);

module.exports = widgetRoutes;

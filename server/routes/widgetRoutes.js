const express = require('express');
const {
    getAllWidgets,
    getOneWidget,
    createNewWidget,
    deleteAWidget,
    updateAWidget,
    getLiveWidgets,
    getInactiveWidgets,
    getWidgetFromDatabase,
} = require('../controllers/widgetsController');

// The router will be added as a middleware and will take control of requests starting with path /record.
const widgetRoutes = express.Router();

// This section will help you get a list of all the records.
widgetRoutes.get('/', getAllWidgets);

widgetRoutes.get('/active', getLiveWidgets);

widgetRoutes.get('/inactive', getInactiveWidgets);

// widgetRoutes.get('/:wid/widgets/:widgetDatabase', getWidgetFromDatabase);

widgetRoutes.get('/:id', getOneWidget);

widgetRoutes.post('/', createNewWidget);

widgetRoutes.delete('/:id', deleteAWidget);

widgetRoutes.patch('/:id', updateAWidget);

module.exports = widgetRoutes;

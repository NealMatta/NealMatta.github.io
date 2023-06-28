const express = require('express');
const {
    getOneQuotesWidget,
    PostmanCreateNewQuotesWidget,
    createNewQuotesWidget,
    deleteQuotesWidget,
    configureQuotesWidget,
} = require('../../controllers/widgets/quotesController');

// The router will be added as a middleware and will take control of requests starting with path /record.
const quotesRoutes = express.Router();

// Get One Widget
quotesRoutes.get('/:id', getOneQuotesWidget);

// TESTING - Create A Widget
quotesRoutes.post('/', PostmanCreateNewQuotesWidget);

// Create a Quotes instance
quotesRoutes.post('/create', createNewQuotesWidget);

// Deletes a Quotes Instance
quotesRoutes.delete('/delete/:id', deleteQuotesWidget);

// widgetRoutes.get('/active', getLiveWidgets);

// widgetRoutes.get('/inactive', getInactiveWidgets);

// widgetRoutes.get('/:id', getOneWidget);

// widgetRoutes.post('/', createNewWidget);

// widgetRoutes.patch('/:id', updateAWidget);

module.exports = quotesRoutes;

const QuotesWidget = require('../../models/widgets/quotesWidgetModel');
const mongoose = require('mongoose');

// Get One Widget
const getOneQuotesWidget = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Quotes Widget' });
    }

    const quotesWidget = await QuotesWidget.findById(id);

    if (!quotesWidget) {
        return res.status(404).json({ error: 'No such Quotes Widget' });
    }

    return res.status(200).json(quotesWidget);
};

// Create New Quotes Widget
const createNewQuotesWidget = async (req, res) => {
    // AFTER CREATION, NEED TO PUSH THE ID INTO THE USERS PESRONAL WIDGETS ARRAY
    const { quotes } = req.body;
    try {
        const quotesWidget = await QuotesWidget.create({
            quotes,
        });
        return res.status(200).json(quotesWidget);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// // Get all Widgets
// const getAllWidgets = async (req, res) => {
//     res.json({ mssg: 'GET all Widgets' });
// };

// // Get one widget
// const getOneWidget = async (req, res) => {
//     res.json({ mssg: 'GET a SINGLE Widget' });
// };

// // Get all live widgets
// const getLiveWidgets = async (req, res) => {
//     try {
//         const liveWidgets = await Widget.find({ live: true }).sort({
//             widgetName: 1,
//         });
//         res.status(200).json(liveWidgets);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Get all inactive widgets
// const getInactiveWidgets = async (req, res) => {
//     try {
//         const liveWidgets = await Widget.find({ live: false }).sort({
//             widgetName: 1,
//         });
//         res.status(200).json(liveWidgets);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Create new widget
// const createNewWidget = async (req, res) => {
//     const {
//         widgetName,
//         widgetDatabase,
//         live,
//         difficultyToCreate,
//         widgetDetails,
//     } = req.body;
//     try {
//         const widget = await Widget.create({
//             widgetName,
//             widgetDatabase,
//             live,
//             difficultyToCreate,
//             widgetDetails,
//         });
//         return res.status(200).json(widget);
//     } catch (error) {
//         return res.status(400).json({ error: error.message });
//     }
// };

// // Delete a widget
// const deleteAWidget = async (req, res) => {
//     res.json({ mssg: 'DELETE a Widget' });
// };

// // Update a widget
// const updateAWidget = async (req, res) => {
//     res.json({ mssg: 'UPDATE a Widget' });
// };

module.exports = {
    getOneQuotesWidget,
    createNewQuotesWidget,
};

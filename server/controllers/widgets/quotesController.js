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

// Postman - Creating a new quotes widget. Used for testing.
// Will need to remove before live
const PostmanCreateNewQuotesWidget = async (req, res) => {
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

// Used when the Create New Widget is hit
const createNewQuotesWidget = async (req, res) => {
    const auth = req.firebaseAuth;
    console.log(auth);

    try {
        // FUTURE - Remove these placeholders
        // Create a blank Quotes Widget
        const quotesWidget = await QuotesWidget.create({
            quotes: [
                {
                    quote: 'Quote 1',
                    source: '- Speaker 1',
                },
                {
                    quote: 'Quote 2',
                    source: '- Speaker 2',
                },
            ],
        });

        // Payload for the Created Widgets Database
        let payload = {};
        payload['uid'] = auth.uid;
        payload['createdWidget'] = quotesWidget._id;
        payload['widgetModel'] = 'QuotesWidget';
        // FUTURE - Consider putting this in environment variable so safe measures?
        payload['widgetConfig'] = '63a22b62f6888bd1ea4841d3';
        return res.status(200).json(payload);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Run when a user selects to delete a widget
const deleteQuotesWidget = async (req, res) => {
    const { id } = req.params;

    try {
        await QuotesWidget.findOneAndDelete({ _id: id });
        return res.status(200).json([]);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getOneQuotesWidget,
    createNewQuotesWidget,
    PostmanCreateNewQuotesWidget,
    deleteQuotesWidget,
};

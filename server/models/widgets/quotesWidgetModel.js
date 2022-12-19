const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quote = new Schema({
    quote: {
        type: String,
        required: true,
    },
    source: {
        type: String,
    },
});

const quotesWidget = new Schema(
    {
        quotes: {
            type: [quote],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('QuotesWidget', quotesWidget);

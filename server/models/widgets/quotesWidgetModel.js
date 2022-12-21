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
        wid: {
            type: Schema.Types.ObjectId,
            required: true,
            default: '63a22b62f6888bd1ea4841d3',
        },
        quotes: {
            type: [quote],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('QuotesWidget', quotesWidget);

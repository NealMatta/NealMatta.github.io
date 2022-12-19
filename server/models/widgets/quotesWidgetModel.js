const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quotesWidget = new Schema(
    {
        quotes: {
            type: Map,
            of: new Schema({
                quote: {
                    type: String,
                    required: true,
                },
                source: {
                    type: String,
                },
            }),
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('QuotesWidget', quotesWidget);

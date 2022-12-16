const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allWidgets = new Schema(
    {
        widgetName: {
            type: String,
            required: true,
        },
        live: {
            type: Boolean,
            required: true,
            default: false,
        },
        difficultyToCreate: {
            type: String,
            required: true,
            enum: ['easy', 'medium', 'difficult'],
        },
        widgetDetails: {
            type: Map,
            of: new Schema({
                backgroundColor: {
                    type: String,
                    required: true,
                },
                imageHeader: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                link: {
                    type: String,
                    required: true,
                },
            }),
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', allWidgets);

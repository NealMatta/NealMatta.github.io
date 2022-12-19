const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const widgetDetailsSchema = new Schema({
    backgroundColor: {
        type: String,
        required: true,
        default: 'red',
    },
    imageHeader: {
        type: String,
        required: true,
        default: 'https://super.so/icon/dark/hash.svg',
    },
    description: {
        type: String,
        required: true,
        default: 'Small blurb describing the purpose of the widget',
    },
    link: {
        type: String,
        required: true,
        default: '#',
    },
});

const widgets = new Schema(
    {
        // Used for frontend to display the name
        widgetName: {
            type: String,
            required: true,
        },
        widgetDatabase: {
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
            enum: ['easy', 'medium', 'difficult'],
        },
        widgetDetails: { type: widgetDetailsSchema, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Widget', widgets);

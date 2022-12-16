const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createdWidgets = new Schema(
    {
        // This needs to look at live widgets only
        widgetType: {
            type: String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
        },
        standardConfigurations: {
            type: Map,
            of: new Schema({
                darkMode: {
                    type: Boolean,
                    required: true,
                    default: false,
                },
            }),
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('CreatedWidgets', createdWidgets);

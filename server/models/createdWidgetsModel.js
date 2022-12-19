const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createdWidgets = new Schema(
    {
        // Widget ID is the object ID when created

        // This needs to look at live widgets only
        widgetType: {
            type: String,
            required: true,
        },
        standardConfigurations: {
            type: Map,
            of: new Schema({
                widgetName: {
                    type: String,
                    required: true,
                },
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

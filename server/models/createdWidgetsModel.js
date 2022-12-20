const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const standardConfigurationsSchema = new Schema({
    widgetName: {
        type: String,
        required: true,
    },
    darkMode: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const createdWidgets = new Schema(
    {
        uid: {
            type: String,
            required: true,
            ref: 'User',
        },
        createdWidget: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'widgetModel',
            // Should Use Widget Model to get the new widget configurations
        },
        widgetModel: {
            type: String,
            required: true,
            enum: ['QuotesModel', 'CharacterCounterModel', 'ChicagoCTAModel'],
        },
        widgetConfig: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Widget',
        },

        standardConfigurations: standardConfigurationsSchema,
    },
    { timestamps: true }
);

module.exports = mongoose.model('CreatedWidgets', createdWidgets);

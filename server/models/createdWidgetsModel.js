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
        // Widget ID is the object ID when created

        uid: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        createdWidget: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'User',
        },
        widgetConfig: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        widgetModel: {
            type: String,
            required: true,
            enum: [
                'QuotesWidget',
                'CharacterCounterWidget',
                'ChicagoCTAWidget',
            ],
        },
        standardConfigurations: standardConfigurationsSchema,
    },
    { timestamps: true }
);

module.exports = mongoose.model('CreatedWidgets', createdWidgets);

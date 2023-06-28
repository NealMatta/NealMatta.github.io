const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
            unique: true,
            // Should Use Widget Model to get the new widget configurations
        },
        widgetModel: {
            type: String,
            required: true,
            default: 'N/A',
            enum: [
                'QuotesWidget',
                'CharacterCounterWidget',
                'ChicagoCTAWidget',
                'N/A',
            ],
        },
        widgetConfig: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Widget',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('CreatedWidgets', createdWidgets);

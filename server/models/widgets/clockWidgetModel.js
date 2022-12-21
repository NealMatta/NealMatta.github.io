const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clockWidgetModel = new Schema(
    {
        widgetName: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ClockWidget', clockWidgetModel);

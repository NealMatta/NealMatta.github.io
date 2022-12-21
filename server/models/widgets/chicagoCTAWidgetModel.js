const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chicagoCTAWidgetModel = new Schema(
    {
        widgetName: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ChicagoCTAWidget', chicagoCTAWidgetModel);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new Schema(
    {
        // Pulled from Firebase. May not need this. May need to only use Mongo
        uid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            validate: [validateEmail, 'Please fill a valid email address'],
        },
        personalWidgets: {
            type: Array,
            required: true,
        },
        paidUser: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

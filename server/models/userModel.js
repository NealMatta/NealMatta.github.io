const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const personalWidgetsSchema = new Schema({
    wid: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'widgetDatabase',
    },
    widgetDatabase: {
        type: String,
        required: true,
    },
});

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
            type: [personalWidgetsSchema],
            // required: true,
            default: {},
        },
        paidUser: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);
const PersonalWidgetsModel = mongoose.model(
    'PersonalWidgets',
    personalWidgetsSchema
);

module.exports = { User: UserModel, PersonalWidgets: PersonalWidgetsModel };
// module.exports = mongoose.model('User', userSchema);

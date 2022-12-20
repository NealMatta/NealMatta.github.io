const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const personalWidgetsSchema = new Schema({
    type: Schema.Types.ObjectId,
    // required: true,
    default: [],
    // ref: 'CreatedWidgets',
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
            type: Schema.Types.ObjectId,
            ref: 'CreatedWidgets',
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

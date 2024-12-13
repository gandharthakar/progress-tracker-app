const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const usersSchema = new Schema({
    user_full_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: [true, "Email is Required."],
        unique: [true, 'Email Already Exist.']
    },
    user_password: {
        type: String,
        min: [8, "Password Should Have Minimum 8 Characters"],
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const UsersModel = models.site_users || model('users', usersSchema);

module.exports = UsersModel;
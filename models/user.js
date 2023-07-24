const mongoose = require("mongoose");
const passportLocalMoongose = require("passport-local-mongoose");
const Token = require('../models/token');
const crypto = require("crypto");

var UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: 'Your username is required',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'Your email is required',
        trim: true
    },
    password: {
        type: String,
        max: 100
    },
    userType: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
})

UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 432000000; //expires 5 days
};

UserSchema.methods.generateVerificationToken = function() {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new Token(payload);
};

UserSchema.plugin(passportLocalMoongose);

module.exports = mongoose.model("User", UserSchema);
"use strict";

// Require libraries
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Enable passport
UserSchema.plugin(passportLocalMongoose);
//#add_fields_ begin -->
UserSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});
//#add_fields_ begin -->



module.exports = mongoose.model('User',UserSchema);

//#comment_model_begin

"use strict";

// Require libraries
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


// Define schema
const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    datePosted: {
        type: String,
        required: true,
        timestamps: true 
    },
    parentBlogpost: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

});

// Enable passport
UserSchema.plugin(passportLocalMongoose);
//#add_fields_ begin -->
UserSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});
//#add_fields_ begin -->



module.exports = mongoose.model('comments',commentSchema);

//#comment_model_end
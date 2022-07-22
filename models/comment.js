//#comment_model_begin

"use strict";

// Require libraries
const mongoose = require("mongoose");



// Define schema
const commentSchema = mongoose.Schema({
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



const comments = mongoose.model('comments',commentSchema);
module.exports = comments;

//#comment_model_end
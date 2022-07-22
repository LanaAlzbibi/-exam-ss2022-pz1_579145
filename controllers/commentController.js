//2. During create, if the user is authenticated, the username field of the Comment object
// should be set to this user's username, otherwise it should be set to "anonymous".
//#comment_controller_begin
"use strict";
const User = require('../models/User.js');
const comment = require('../models/comment.js');


module.exports = {
    create: (req, res) => {
     comment
    .find()
    .exec()
    .then((checkout) => {
      if (checkout != null) {
        checkout = new checkOut({
            username: req.body.username,
            datePosted: req.body.post,
            
        });
        checkout
          .save()
          .then(
            req.flash("success", ` your comment is sent `),

          )
          .catch((error) => {
            if (error)
              req.flash(
                "error",
                `Failed to save information because: ${error.message}.`,
            
              );
          });
      }
    });
},
}
// #comment_controller_end
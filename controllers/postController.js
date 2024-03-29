"use strict";

// Require libraries
const path = require("path");

// Require models
const BlogPost = require("../models/BlogPost");
const comment = require('../models/comment.js');

module.exports = {
  showPost: async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render("post", {
      bgimage: blogpost.image,
      heading: blogpost.title,
      subheading:
        "Posted by " +
        blogpost.username +
        " on " +
        blogpost.datePosted.toDateString(),
      content: blogpost.content,
    });
  },

//#association_begin
  showCommment: async (req, res) => {
    comment
    .find()
    .exec()
    .then((comment) => {
      res.render("post", {
        username: comment.username,
        comment: comment.comment,
        subheading:
          "Posted by " +
          comment.username +
          " on " +
          comment.datePosted.toDateString(),
      })
    })  .catch((error) => {
      console.log(error.message);
      return [];
    });
   
  },
//#association_end

  // #static_page_start.
  showAbout: (req, res) => {
    res.sendFile("../views/about.html", { root: __dirname });
  },
  // #static_page_end.

  showCreate: (req, res) => {
    if (res.locals.loggedIn) {
      return res.render("create", {
        bgimage: "/img/contact-bg.jpg",
        heading: "Create New Post",
        subheading: "Please provide title, text and background image",
      });
    }
    res.redirect("/users/login");
  },

  create: async (req, res) => {
    if (req.body.title == null) {
      req.flash("error", "Please provide a title for the post");
      res.redirect("/posts/new");
    } else if (req.body.content == null) {
      req.flash("error", "Please provide content for the post");
      res.redirect("/posts/new");
    } else if (req.files == null || req.files.image == null) {
      req.flash("error", "Please provide a background image");
      res.redirect("/posts/new");
    } else {
      let image = req.files.image;
      image.mv(
        path.resolve(__dirname, "..", "public/img", image.name),
        async (error) => {
          await BlogPost.create(
            {
              title: req.body.title,
              content: req.body.content,
              username: res.locals.currentUser.username,
              image: "/img/" + image.name,
            },
            (error, savedDoc) => {
              // Uncomment for debugging
              // if (error) console.log(error);
              // console.log(savedDoc)
            }
          );
          res.redirect("/");
        }
      );
    }
  },
};

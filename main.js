"use strict";

// Require libraries
const express = require("express");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const expressSession = require("express-session");
const expressValidator = require("express-validator");
const connectFlash = require("connect-flash");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// Require custom controllers
const homeController = require("./controllers/homeController");
const postController = require("./controllers/postController");
const userController = require("./controllers/userController");
const errorController = require("./controllers/errorController");

// Require models
const User = require("./models/User");

// Connect to db

// # connecting to my mongoose database

// const dbURI = "mongodb+srv://lana-user:eWK4v7H2I151Qu1K@klasur.dmh49hl.mongodb.net/?retryWrites=true&w=majority";
// // mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true});

const dbURI =
  "mongodb+srv://anh:nguyenhuong@cluster0.l8d9p.mongodb.net/?retryWrites=true&w=majority";
//mongoose.connect('mongodb://localhost:3000/my_database',{useNewUrlParser: true});
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Setup Express app
const app = new express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(fileUpload());

// Setup Express router
const router = express.Router();
router.use(layouts);
router.use(express.static("public"));
router.use(
  express.urlencoded({
    extended: false,
  })
);
router.use(express.json());
router.use(expressValidator());
router.use(cookieParser("pink tomato"));
router.use(
  expressSession({
    secret: "pink tomato",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(connectFlash());

// Setup passport
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

// Define routes
router.get("/", homeController.showIndex);
router.get("/users/register", userController.showRegister);
router.post("/users/create", userController.register);
router.get("/users/login", userController.showLogin);
router.post("/users/login", userController.login);
router.get("/users/logout", userController.logout);
router.get("/post/:id", postController.showPost);
router.get("/posts/new", postController.showCreate);
router.post("/posts/create", postController.create);
//  #static_page_begin
router.get("/about.html", postController.showAbout);
// #static_page_end.
router.use(errorController.pageNotFoundError);
app.use("/", router);

// Start server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

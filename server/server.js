var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

var User = require("./components/User/UserController");

// CONFIGURATION

var port = process.env.PORT || 8000; //declaring port

//to access resources from remote hosts
app.options("*", cors());

//bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//using passport js
app.use(passport.initialize());
app.use(passport.session());

//configuring headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Registered-With,Content-Type,Accept"
  );
  next();
});

//storing user info in session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//using passport js for authentication
passport.use(
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username).then(
      user => {
        User.comparePassword(password, user.password).then(
          //maching password
          isMatch => {
            return done(null, user);
          },
          reason => {
            return done(null, false, { message: "Invalid password" });
          }
        );
      },
      reason => {
        return done(null, false, { message: "Unknown User" });
      }
    );
  })
);

//SETTING UP ROUTES
var router = express.Router();
app.use("/api", router);

//test api
router.get("/", (req, res) => {
  res.json({ message: "welcome to mckinley&rice apis" });
});

//login api (uses passport.js for authentication)
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    status: true,
    message: "logged in"
  });
});

//regiter api
router.post("/signup", User.signup);

//assigning port
app.listen(port, () => {
  console.log("McKinley&Rice Server running at http://localhost:", port);
});

var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = 
        require("passport-local-mongoose")
const User = require("./model/User");
var app = express();
const mime = require('mime');

app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (mime.getType(path) === 'text/css') {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

const uri = 'mongodb://127.0.0.1:27017/mydatabase'; // Replace 'mydatabase' with your desired database name

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your application or perform further operations
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    // Handle connection error
  });

  
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());
  
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  
//=====================
// ROUTES
//=====================
  
// Showing home page
app.get("/", function (req, res) {
    res.render("home");
});
  
// Showing secret page
app.get("/index", isLoggedIn, function (req, res) {
    res.render("index");
});
  
// Showing register form
app.get("/register", function (req, res) {
    res.render("register");
});
  

// Handling user signup
app.post("/register", async (req, res) => {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    });
    
    return res.redirect("/login");

  });
  
//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});

// Showing form page
app.get("/reservation", function (req, res) {
  res.render("reservation");
});

// Handling user login
app.post("/login", async function (req, res) {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      // check if password matches
      const result = req.body.password === user.password;
      if (result) {
        // Successful login
        res.render("index");
      } else {
        // Password doesn't match
        res.render("login", { error: "Password doesn't match", authenticated: false });
      }
    } else {
      res.render("login", { error: "User doesn't exist", authenticated: false });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});



  
//Handling user logout 
app.get("/logout", function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});
  
  
  
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
  
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});
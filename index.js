var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
	User = require('./models/user'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost:27017/auth_demo", { useNewUrlParser: true }); 
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
	secret: "Rusty is the best dog.",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===================
//ROUTES
//===================

app.get("/", function(req, res){
    res.render("home");
});

// Auth Routes

//show sign up form
app.get("/register", function(req, res){
   res.render("register"); 
});

app.get("/secret", function(req, res){
   res.render("secret"); 
});

//handling user sign up
app.post("/register", (req, res) => {
	// req.body.username
	// req.body.password
    User.register(new User({username: req.body.username}), req.body.password, (err, user) =>{
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, () => {
           res.redirect("/secret");
        });
    });
});

app.listen(3000, () => {
	console.log('server listening');
});
// LOGIN ROUTES
//render login form
// app.get("/login", function(req, res){
//    res.render("login"); 
// });
//login logic
//middleware
// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/secret",
//     failureRedirect: "/login"
// }) ,function(req, res){
// });

// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/");
// });


// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

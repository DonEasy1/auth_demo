var express = require('express');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/auth_demo", { useNewUrlParser: true }); 

var app = express();
app.set('view engine', 'ejs');

app.get ('/', (req, res) => {
	res.render('home');
});

app.get("/secret", (req, res) => {
	res.render("secret");
});

app.listen(3000, () => {
	console.log('listening');
});
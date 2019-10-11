var exp = require("express");
var bodyParser = require("body-parser");
var app = exp();
var PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // JS embedded into html

app.get("/", function(req, res) {
	res.render("home");
});

var friends = ["Mathew", "Mark", "Luke", "John"];

app.get("/friends", function(req, res) {
	res.render("friends", {friends: friends}); // pass the object to ejs file
});

// create post route to add new friends
app.post("/addfriend", function(req, res) {
	// requrie to install body parser to use req.body
	var newFriend =req.body.newFriend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.listen(PORT, function(){
	console.log("Server started ....");
});
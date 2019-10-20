var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	app = express();
var PORT = 3000;

mongoose.connect("mongodb://localhost/RESTful_BlogApp", {useNewUrlParser : true, useUnifiedTopology: true});
app.set("views engine", "ejs");
// Serve static files (images, css, js files). Express looks up the files relative to the static directory
// Allows loading the files that are in the public directory:
app.use(express.static("public")); 
// body
app.use(bodyParser.urlencoded({extended: true}));

// Setup & config Database
var BlogSchema = new mongoose.Schema(
	{
		title : String,
		image : String,
		body : String,
		createdDate : {type : Date, default : Date.now}
		
	}
);
var Blog = mongoose.model("Blog", BlogSchema );



app.listen(PORT, () => console.log("Blog server started ..."));
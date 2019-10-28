var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	app = express();
var PORT = 3000;

mongoose.connect("mongodb://localhost/RESTful_BlogApp", {useNewUrlParser : true, useUnifiedTopology: true});
app.set("view engine", "ejs");
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
		created : {type : Date, default : Date.now}
		
	}
);
var Blog = mongoose.model("Blog", BlogSchema );

//Create
/** Blog.create({
		title:"How to code", 
	 	image:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
		body: "Yeah, I do that with my stupidness. Tell them I hate them. Ah, yes!\
			   John Quincy Adding Machine. He struck a chord with the voters when he \
			   pledged not to go on a killing spree. What kind of a father would I be if I said no?"
	}, function(err, blog){ 
		if (err) {
			console.log(err);
		} else {
			console.log("New blog added");
		}
	});
*/
// RESful ROUTING

// INDEX - list all blog posts (GET)
app.get("/blogs", function(req, res) {
	Blog.find({}, function (err, allBlogs) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {blogs : allBlogs});
		}
	})	
});	

// NEW - Display Form for 	creating new blog post (GET)
app.get("/blogs/new", (req, res) => res.render("new"));

//CREATE - Create new blog post and redirect to blog list (POST)	
app.post("/blogs", function(req, res) {	
	
	Blog.create(req.body.blog, function(err, newBlog) {
		if(err) {
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

// SHOW - show specific blog by id
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect("/blogs");
		}else {
			res.render("show", {blog: foundBlog});
		}
	})
});
app.listen(PORT, () => console.log("Blog server started ..."));	

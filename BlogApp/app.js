var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	expressSanitizer = require("express-sanitizer"),
	app = express(),
	methodOverride = require("method-override");
var PORT = 3000;

//CONFIG APPLICATION
mongoose.connect("mongodb://localhost/RESTful_BlogApp", {useNewUrlParser : true, useUnifiedTopology: true});
app.set("view engine", "ejs");
// Serve static files (images, css, js files). Express looks up the files relative to the static directory
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
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
// RESful ROUTING - 7 routes

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

// NEW - Display Form for creating new blog post (GET)
app.get("/blogs/new", (req, res) => res.render("new"));

//CREATE - Create new blog post and redirect to blog list (POST)	
app.post("/blogs", function(req, res) {	
	req.body.blog.body = req.sanitize(req.body.blog.body); //eliminate andy script tags from running JS
	Blog.create(req.body.blog, function(err, newBlog) {
		if(err) {
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

// SHOW - show specific blog by id (GET)
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect("/blogs");
		}else {
			res.render("show", {blog: foundBlog});
		}
	});
});

//EDIT - show edit form for a single blog post (GET)
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect("/blogs");
		}else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

//UPDATE - 	update existing blog post (PUT)
app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if (err) {
			res.redirect("/index");
		}else {
			res.redirect("/blogs/" + req.params.id);
		}
	 });
});

// DELETE - route deletes existing blog
app.delete("/blogs/:id", function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
	 	if (err) {
	 		res.redirect("/index");
		}else {
	 		res.redirect("/blogs");
	 	}
	 });
});

// Start Server
app.listen(PORT, () => console.log("Blog server started ..."));	

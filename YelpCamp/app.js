var app = require("express")();
var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//CONNECT Mongodb
mongoose.connect("mongodb://localhost/YelpCamp",  { useNewUrlParser: true, useUnifiedTopology: true});

//Setup SCHEMA
var campgroundsSchema = new mongoose.Schema(
	{
		name: String,
	 	image: String,
	 	description: String
	});

var Campground = mongoose.model("Campgrounds", campgroundsSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// INITIALIZED Campground
// Campground.create(
// 	{
// 		name:"Mountains Peak", 
// 	 	image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80",
// 		description:"Feels like God's mountain"
// 	}, function(err, camp){ 
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("New camp added");
// 			console.log(camp);
// 		}
// 	});

//Setup homepage
app.get("/", function(req, res) {
	res.render("landing_page");
});

// INDEX ROUTE - Show list of campgrounds from DB
app.get("/campgrounds", function(req, res) {
	// Find all campgrounds in database and display
	Campground.find({}, function(err, allCampGrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {campsDatabase: allCampGrounds});
		}
	});
});

//NEW ROUTE - show form to enter new campround 
app.get("/campgrounds/new", (req, res) => res.render("new.ejs"));

//SHOW ROUTE - show additional info for a campground in DB
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id, function(err, camp){
		if (err) {
			console.log(err);
		} else {
			res.render("show.ejs", {campground:camp});
		}
	});
});

//CREATE ROUTE - add new campground to DB 
app.post("/campgrounds", function(req, res) {
	// retrieve data from Form and add to campgroundsDatabase Array
	var name = req.body.name,
		image = req.body.image,
		description = req.body.description,
		newCamp = {name: name, image: image, description: description};
	// Add new camp data to database (Array)
	Campground.create(
	{
		name:name, 
	 	image:image,
		description:description
	}, function(err, newCamp){ 
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
	//campsDatabase.push(newCamp);
	// redirect back to campground 
	
});


//Start server
app.listen(PORT, () => console.log("YelpCamp Server started..."));
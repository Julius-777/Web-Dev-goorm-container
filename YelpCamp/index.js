var app = require("express")();
var PORT = process.env.PORT || 3000;
var campsDatabase = [
	{name:"Salmon Creek", image:"https://pixabay.com/get/54e8d6424253a414f6da8c7dda793f7f1636dfe2564c704c722f7cd3914dc15d_340.jpg"},
	{name:"Granite Hill", image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722f7ddd964fc35a_340.jpg"},
	{name:"Mountains Peak", image:"https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424_960_720.jpg"},
];

app.set("view engine", "ejs");

//Setup homepage
app.get("/", function(req, res) {
	res.render("landing_page");
})

// Camp grounds page
app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campsDatabase: campsDatabase});
})

//Start server
app.listen(PORT, () => console.log("YelpCamp Server started..."));
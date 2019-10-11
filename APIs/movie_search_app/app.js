var request = require("request");
var app = require("express")();
app.set("view engine", "ejs");

app.get("/", (req, res) => 
	   res.render("search"));

// responed to results request with omdbapi query
app.get("/results", function(req, resp) {
	var query = req.query.newMovie;
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
	request(url, function(err, response, body){
		if(!err && response.statusCode == 200) {
			var data = JSON.parse(body) // String -> Object
			resp.render("results", {data: data});//data passed to results.ejs
			
		}	else {
			console.log("error: " + err);
			console.log("response Status-Code: " + response.statusCode);
			
		}
	});
});

// Start Movie search app
app.listen(3000, ()=>
		  console.log("Movie app started (server running..)"))

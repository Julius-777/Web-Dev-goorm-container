function main(){
	console.log("Hello goorm!");
}

var express = require("express");
var app = express();

/* Response to the request */
app.get('/', function(req, res) {
	res.send("Hi there");
});

/* Responsed Woof to the request ro /dog*/
app.get('/dog', function(req, res) {
	res.send("WOof");
});

/* Listen for a request -> start server*/
var server = app.listen(process.env.PORT || 3000, process.env.IP, function () {
	console.log('Server started:');
});

//

main();
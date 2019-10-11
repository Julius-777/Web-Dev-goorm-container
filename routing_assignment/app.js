var express = require("express");
var $ = require("jquery");
var app = express();
var PORT = process.env.PORT || 3000;


// Response to request to root route/URL
app.get('/', (req, res) => res.send("HOME PAGE - Welcome to my assignment!"));

// Response to request to animals sub route/URL
app.get('/speak/:animal', function(req, res) {
	var animalNoise;
	var animal = req.params.animal;
	console.log(animal);
	if (animal === "pig") animalNoise = "Oink ";
	if (animal === "cow") animalNoise = "Moo ";
	if (animal ==="dog") animalNoise = "Woof ";
	console.log(animalNoise);
	res.send(animal + " says " + animalNoise);
});
// Response to request to "repeat a word" route/URL
app.get('/repeat/:word/:number', function(req, res) {
	console.log("Total:" + hellos);
	var hellos = parseInt(req.params.number, 10);
	var message = "";
	for ( i = 0; i < hellos; i++) {
		message += req.params.word + " ";
	}
	res.send(message);
});

// Response to page not found
app.get('*', (req, res) => res.send("Sorry Page Not Found ... What are you doing with your life??"));

// Listen to request from localhost:3000
app.listen(PORT, () => console.log(" Server Started. Listenning on port ... " + PORT));


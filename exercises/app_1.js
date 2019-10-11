var cat = require("cat-me");
var joke = require("knock-knock-jokes");

// console.log(cat());
// console.log(joke());

var faker = require("faker");
var i = 0;
while(i < 10) {
	i++;
	console.log(i);
	console.log(faker.commerce.productName() + " || price: $" + faker.commerce.price());
	
}
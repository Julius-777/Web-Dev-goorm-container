var request = require("request");

request("http://www.google.com", function(err, resp, body){
	if(!err && resp.statusCode == 200) {
		console.log(body);//print html
	} else {
		console.log("error: Status-Code-" + resp.statusCode);
	}
});
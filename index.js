var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	var result = '';
	var times = process.env.TIMES || 5;
	for(i=0; i < times; i++) {
		result += "Hello Boulder - " + i + "<br>";
	}
  response.send(result);
})

app.get('/crashLater', function(request, response) {
	var exitValue = 1;
	response.json(`I'm going to crash in 1s - with Exit Value: ${exitValue}`);
	console.log(`I'm going to crash in 1s - with Exit Value: ${exitValue}`);
	setTimeout(function() {
		console.log("timeout up - crashing now");
		process.exit(exitValue);
	}, 1000);
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

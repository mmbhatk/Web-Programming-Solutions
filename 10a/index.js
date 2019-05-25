var express = require('express')
var app = express()

var count = 0

var logger = function(req, res, next) {
	console.log("Logged.")
	next()
}

var counter = function(req, res, next) {
	count += 1
	next()
}

app.use(logger)
app.use(counter)

app.get('/', function(req, res) {
	console.log("Visited: " + count)
	res.end("Visited: " + count)
})

app.listen(5000, function(err) {
	console.log("Listening on port 5000.")
})

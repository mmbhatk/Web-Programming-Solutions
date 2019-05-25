var express = require('express')
var app = express()

app.get('/cse', function(req, res) {
	console.log("Serving cse.html.")
	res.sendFile(__dirname + '/cse.html')
})

app.get('/ise', function(req, res) {
	console.log("Serving ise.html.")
	res.sendFile(__dirname + '/ise.html')
})

app.get('/ece', function(req, res) {
	console.log("Serving ece.html.")
	res.sendFile(__dirname + '/ece.html')
})

app.listen(5000)

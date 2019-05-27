var express = require('express')
var app = express()

app.get('/', function(req, res) {
	console.log("Serving the home page.")
	res.sendFile(__dirname + '/home.html')
})

app.get('/registration', function(req, res) {
	console.log("Serving the registration page.")
	res.sendFile(__dirname + '/registration.html')
})

app.get('/announcements', function(req, res) {
	console.log("Serving the announcements page.")
	res.sendFile(__dirname + '/announcements.html')
})

app.get('/contact', function(req, res) {
	console.log("Serving the contact page.")
	res.sendFile(__dirname + '/contact.html')
})

app.listen(5000)
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1/11b"

app.use(bodyParser.json())
app.use(express.static('public'))

MongoClient.connect(url, function(err, db) {
	if(!err)
	{
		console.log("Connected to the database.")

		app.get('/', function(req, res) {
			res.sendFile(__dirname + '/public/form.html')
		})

		app.post('/insert', function(req, res) {
			console.log("Inside insert.")
			db.collection('student').insert({name: req.body.name, attendance: parseInt(req.body.attendance)})
			console.log("\nInserted:\t" + JSON.stringify(req.body))
			res.send("Student record inserted: " + JSON.stringify(req.body))
		})

		app.get('/display', function(req, res) {
			db.collection('student').find({attendance: {$lt: 75}}, {_id: 0}).toArray(function(err, data) {
				console.log("Attendance below 75:\t" + JSON.stringify(data))
				res.send(JSON.stringify(data))
			})
		})

		app.get('/drop', function(req, res) {
			db.collection('student').drop()
			console.log("The collection has been dropped.")
			res.send("The collection has been dropped.")
		})
	}
	else console.log("Error")
})

app.listen(5000)
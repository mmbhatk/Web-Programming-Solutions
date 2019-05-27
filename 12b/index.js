var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1/12b"

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
			db.collection('student').insert({name: req.body.name, marks: parseInt(req.body.marks)})
			console.log("Inserted:\t" + JSON.stringify(req.body))
			res.send("Inserted:\t" + JSON.stringify(req.body))
		})

		app.get('/display', function(req, res) {
			db.collection('student').find({marks: {$lt: 20}}, {_id: 0}).toArray(function(err, data) {
				console.log("Students with marks less than 20: " + JSON.stringify(data))
				res.send("Students with marks less than 20: " + JSON.stringify(data))
			})
		})

		app.get('/drop', function(req, res) {
			db.collection('student').drop()
			console.log("The collection has been dropped.")
			res.send("The collection has been dropped.")
		})
	}
	else console.log("Error.")
})

app.listen(5000)
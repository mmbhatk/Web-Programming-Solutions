var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1/7b"

app.use(bodyParser.json())
app.use(express.static('public'))

MongoClient.connect(url, function(err,db){
	if(!err)
	{
		console.log("Connected to the database.")

		app.get('/', function(req, res) {
			res.sendFile(__dirname + '/public/form.html')
		})

		app.post('/insert', function(req, res) {
			console.log(req.body)
			db.collection('student').insert({name: req.body.name, grade: req.body.grade})
			res.send("Student record inserted:\t" + JSON.stringify(req.body))
		})

		app.get('/display', function(req, res) {
			var result = []
			db.collection('student').find({grade: 'S'}, {_id: 0, grade: 0}).toArray(function(err, data) {
				console.log(data)
				res.send(data)
			})
		})

		app.get('/drop', function(req, res) {
			db.collection('student').drop()
			console.log("The collection has been dropped.")
			res.send("The collection has been dropped.")
		})
	}
})

app.listen(5000)

var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1/placements'

MongoClient.connect(url, function(err, db) {
	if(!err)
	{
		console.log("Connected to the database.")

		app.get('/', function(req, res) {
			res.sendFile(__dirname + '/form.html')
		})

		app.get('/insert', function(req, res) {
			db.collection('placements').insert({usn: req.query.usn, name: req.query.name, company: req.query.company})
			console.log("Inserted:\t" + JSON.stringify(req.query))
			res.end("Inserted:\t" + JSON.stringify(req.query))
		})

		app.get('/display', function(req, res) {
			db.collection('placements').find({}, {_id: 0}).toArray(function(err, data) {
				console.log(JSON.stringify(data))
				res.end(JSON.stringify(data))
			})
		})

		app.get('/infosys', function(req, res) {
			db.collection('placements').find({company: 'infosys'}, {_id: 0}).toArray(function(err, data) {
				console.log(JSON.stringify(data))
				res.end(JSON.stringify(data))
			})
		})

		app.get('/drop', function(req, res) {
			db.collection('placements').drop()
			console.log("Collection has been dropped.")
			res.end("Collection has been dropped.")
		})

	}
	else console.log("Error.")
})

app.listen(5000)

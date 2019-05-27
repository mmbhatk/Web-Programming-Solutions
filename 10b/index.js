var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1/faculty"

MongoClient.connect(url, function(err, db) {
	if(!err)
	{
		console.log("Connected to the database.")

		app.get('/', function(req, res) {
			res.sendFile(__dirname + '/form.html')
		})

		app.get('/insert', function(req, res) {
			db.collection('faculty').insert({id: req.query.id, title: req.query.title, name: req.query.name, branch: req.query.branch})
			console.log("Inserted:\t" + JSON.stringify(req.query))
			res.end("Inserted:\t" + JSON.stringify(req.query))
		})

		app.get('/display', function(req, res) {
			db.collection('faculty').find({}, {_id: 0}).toArray(function(err, data) {
				console.log(JSON.stringify(data))
				res.end(JSON.stringify(data))
			})
		})

		app.get('/cseprofessor', function(req, res) {
			db.collection('faculty').find({branch: 'cse', title: 'professor'}, {_id: 0, branch: 0, title: 0}).toArray(function(err, data) {
				console.log(JSON.stringify(data))
				res.end(JSON.stringify(data))
			})
		})

		app.get('/drop', function(req, res) {
			db.collection('faculty').drop()
			console.log('Collection has been dropped.')
			res.end('Collection has been dropped.')
		})

		app.listen(5000)
	}
	else console.log("Error.")
})
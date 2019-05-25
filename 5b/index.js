var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://127.0.0.1/student"

MongoClient.connect(url, function(err, db) {
	if(!err)
	{
		console.log("Connected to the database.")

		app.get('/', function(req, res) {
			res.sendFile(__dirname + '/form.html')
		})

		app.get('/insert', function(req, res) {
			db.collection('student').insert({name: req.query.name, usn: req.query.usn, dept: req.query.dept, grade: req.query.grade})
			console.log("Inserted:\t" + JSON.stringify(req.query))
			res.end("Inserted:\t" + JSON.stringify(req.query))
		})

		app.get('/update', function(req, res) {
			db.collection('student').update({name: req.query.name}, {$set: {grade: req.query.grade}})
			console.log("Updated:\t" + JSON.stringify(req.query))
			res.end("Updated:\t" + JSON.stringify(req.query))
		})

		app.get('/display', function(req, res) {
			db.collection('student').find({}, {_id: 0}).toArray(function(err, data) {
				console.log(JSON.stringify(data))
				res.end(JSON.stringify(data))
			})
		})

		app.get('/drop', function(req, res) {
			db.collection('student').drop()
			console.log("Collection has been dropped.")
			res.end("Collection has been dropped.")
		})
	}
	else console.log("Error")
})

app.listen(5000)

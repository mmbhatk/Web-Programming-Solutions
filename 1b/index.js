var express = require('express')
var app = express()
var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1/student'

mongoClient.connect(url, function(err, db) {
	if(!err)
	{
		console.log("Connected to the database.")

		app.get('/', function(req, res) {
			res.sendFile(__dirname + '/form.html')
		})

		app.get('/insert', function(req, res) {
			db.collection('student').insert({usn: req.query.usn, name: req.query.name, scode: req.query.scode, cie: parseInt(req.query.cie)})
			console.log("\nInserted:\t" + JSON.stringify(req.query))
			var content = "Inserted:<br>" + JSON.stringify(req.query)

			db.collection('student').find({cie: {$lt: 20}}, {_id: 0}).toArray(function(err, data) {
				console.log("\nStudents with CIE marks less than 20:\n" + JSON.stringify(data))
				res.send(content + "<h2>Students with CIE marks less than 20</h2>" + JSON.stringify(data))
			})
		})

		app.get('/display', function(req, res) {
			db.collection('student').find().toArray(function(err, data) {
				console.log("\nDetails of all students:\n" + JSON.stringify(data))
				res.send("<h2>Details of all students</h2>" + JSON.stringify(data))
			})
		})

		app.get('/drop', function(req, res) {
			db.collection('student').drop()
			console.log("Collection has been dropped.")
			res.send("Collection has been dropped.")
		})
	}
})

app.listen(5000)

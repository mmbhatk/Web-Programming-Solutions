var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1/3b'

MongoClient.connect(url, function(err, db) {
	if(!err)
	{
		console.log("Connected to the database.")
		db.collection('vote').drop()
		db.collection('vote').insert({party: 'BJP', vote: 0})
		db.collection('vote').insert({party: 'Congress', vote: 0})
		db.collection('vote').insert({party: 'NOTA', vote: 0})

		app.get('/', function(req, res) {
			res.sendFile(__dirname + '/form.html')
		})

		app.get('/vote', function(req, res) {
			var party = req.query.party
			db.collection('vote').update({party: party}, {$inc: {vote: 1}})

			console.log("Voted for: " + party)
			res.send("<h2>You have voted for: " + party + "</h2>")
		})

		app.get('/result', function(req, res) {
			db.collection('vote').find({}, {_id: 0}).toArray(function(err, data) {
				console.log(JSON.stringify(data))
				res.end(JSON.stringify(data))
			})
		})
	}
	else console.log("Error")

	app.listen(5000)
})
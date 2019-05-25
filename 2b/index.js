var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended: false})
var expressValidator = require('express-validator')

app.use(expressValidator())

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/form.html')
})

app.post('/validate', urlencodedParser, function(req, res) {
	req.checkBody('name', 'Name should be non-empty').notEmpty()
	req.checkBody('surname', 'Surname should be a string').isAlpha()
	req.checkBody('salary', 'Salary should be an integer').isInt()

	var errors = req.validationErrors()

	if(errors)
	{
		console.log("Error")
		res.send(errors)
	}
	else
	{
		res.end("ID: " + req.body.id + "\nName: " + req.body.name + "\nSurname: " + req.body.surname + "\nDesignation: " + req.body.designation + "\nSalary: " + req.body.salary)
		console.log("ID: " + req.body.id + "\nName: " + req.body.name + "\nSurname: " + req.body.surname + "\nDesignation: " + req.body.designation + "\nSalary: " + req.body.salary)
	}
})

app.listen(5000, function(err) {
	console.log("Listening on port 5000.")
})

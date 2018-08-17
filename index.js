var express = require('express')
var http = require('http')
var app = express();
var route = require('./config/routes')
app.set('port',process.env.PORT||3000);
var bodyParser = require('body-parser')
require('./app/models/db')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api',route);
app.use('/',function(req,res)
{
	res.send('Hello World')
})

app.listen(app.get('port'), () => console.log('Server starts'))
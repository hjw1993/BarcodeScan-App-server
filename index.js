var express = require('express')
var homeCtr = require('./app/controllers/homeCtrl')
var http = require('http')
var app = express();
var route = require('./config/routes')
app.set('port',process.env.PORT||3000);
var bodyParser = require('body-parser')
var handlebars = require('express3-handlebars') .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
require('./app/models/db')
var request = require('request')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api',route);
app.get('/',homeCtr.homeList)

app.listen(app.get('port'), () => console.log('Server starts'))
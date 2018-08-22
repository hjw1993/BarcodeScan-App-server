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
var apiOptions = {
	server:'http://localhost:3000/'
}
if(process.env.NODE_ENV === 'production')
{
	apiOptions.server='https://pure-retreat-19989.herokuapp.com/'
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use('/api',route);
app.get('/',homeCtr.homeList)
app.get('*',function(req,res)
{
	res.render('404',
		{
			homeURL:apiOptions.server
		});
})

app.listen(app.get('port'), () => console.log('Server starts'))
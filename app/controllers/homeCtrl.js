var mongoose = require('mongoose')
require('../models/item')
var item = mongoose.model('Item')

var request = require('request')
var apiOptions = {
	server:'http://localhost:3000/'
}
if(process.env.NODE_ENV === 'production')
{
	apiOptions.server='https://pure-retreat-19989.herokuapp.com/'
}

module.exports.homeList=function(req,res)
{
	var options={
		url:apiOptions.server+'api/allitems',
		method:'GET',
		json:{},
		qs:{}
	}
	request(options,function(err,response,body)
	{
		renderHomePage(req,res,body)
	})
}

var renderHomePage=function(req,res,body)
{
	
	res.render('home',{
		items:body.items,
		homeUrl:apiOptions.server
	})
}
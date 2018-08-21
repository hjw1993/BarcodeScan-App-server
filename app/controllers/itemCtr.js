
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



module.exports.searchItemByUpc=function(req,res)
{
	console.log(req.query)
	if(req.query&&req.query.upc)
	{
		item.find({upc:req.query.upc},function(err,results)
		{
			if(err)
			{
				res.status(500);
				res.json({message:err,success:false})
			}
			else
			{
				if(results.length>0)
				{
					res.status(200);
					res.json({upc:results,success:true})
				}
				else
				{
					res.status(200);
					res.json({message:'Item is not found',success:false})
				}
			}
			
		})

	}
	else
	{
		res.status(404)
		res.json({message:'Please provide upc barcode of item',success:false})
	}

	
}

module.exports.saveItem=function(req,res)
{
	console.log(req.body)
	if(req.body&&req.body.upc&&req.body.name)
	{
		item.create({upc:req.body.upc,name:req.body.name},function(err,item)
		{
			renderHomePage(req,res,item.item,err)
		})
	}
	else
	{
		renderHomePage(req,res,null,err)
		// res.json({message:'Please provide the name and upc of item',success:false})
	}
}


module.exports.getAllItems=function(req,res)
{
	item.find(function(err,items)
	{
		if(err)
		{
			res.status(500);
			res.json({success:false,message:err})
		}
		else
		{
			res.status(200);
			res.json({success:true,items:items})
		}
	})
}


var renderHomePage = function(req,res,body,error)
{

	var options={
		url:apiOptions.server+'api/allitems',
		method:'GET',
		json:{},
		qs:{}
	}
	request(options,function(err,response,body)
	{


			if(error)
			{
				res.render('home',{
					items:body.items,
					err:error,
					homeUrl:apiOptions.server
				})
			}
			else if(body==null)
			{	
				res.render('home',
				{
					items:body.items,
					err:'Please provide name and UPC code of product',
					homeUrl:apiOptions.server
					
				})
			}
			else
			{
				res.render('home',
						{
							items:body.items,
							message:'Item saved successfully',
							homeUrl:apiOptions.server
						}
					)
			}
		
	})
	
}
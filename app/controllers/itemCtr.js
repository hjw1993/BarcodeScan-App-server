
var mongoose = require('mongoose')
require('../models/item')
var item = mongoose.model('Item')

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
			if(err)
			{
				res.status(500);
				res.json({message:err,success:false});
			}
			else
			{
				res.status(200);
				res.json({item:item,success:true})
			}
		})
	}
	else
	{
		res.json({message:'Please provide the name and upc of item',success:false})
	}
}
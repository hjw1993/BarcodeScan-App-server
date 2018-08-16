var mongoose= require('mongoose')

var Schema = mongoose.Schema
var itemSchema=new Schema({
	_id:{type:Schema.Types.ObjectId,auto:true},
	name:{type:String,required:true},
	upc:{type:String,unique: true,required:true}
})

var item=mongoose.model('Item',itemSchema)


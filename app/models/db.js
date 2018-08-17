var mongoose = require('mongoose')
var dbURI= "mongodb://localhost:27017/green"
// Retrieve
if(process.env.NODE_ENV=== 'production')
{
	dbURI='mongodb://jingwei:hjw123456@ds018508.mlab.com:18508/green'
}

// Connect to the db
// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect(url,{useNewUrlParser: true},function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

mongoose.connect(dbURI,{useNewUrlParser: true})

mongoose.connection.on('connected',()=>{
	console.log('Mongoose connected to' + dbURI)
})

mongoose.connection.on('error',(err)=>{
	console.log('Mongoose connection error' + err)
})

mongoose.connection.on('disconnected',()=>{
	console.log('Mongoose disconnected' )
})
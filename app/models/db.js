var mongoose = require('mongoose')
// Retrieve


// Connect to the db
// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect(url,{useNewUrlParser: true},function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });
var url = "mongodb://localhost:27017/green";
mongoose.connect(url,{useNewUrlParser: true})
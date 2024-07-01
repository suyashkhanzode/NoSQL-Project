 require('dotenv').config();

 const mongo = require('mongodb');

 let _db;

 const mongoClient = mongo.MongoClient;

 const connect = (callback) =>{
   
    mongoClient.connect(process.env.CONNECTION_URL)
    .then((res)=>{
       console.log("Connected")
       _db = res.db();
       callback(res)
    })
    .catch((err)=>{
       console.log(err)
    })
 };

 const getDb =() =>{
     if(_db){
      return _db;
     }else {
      throw 'No Database Found';
     }
 }

module.exports = {connect,getDb};

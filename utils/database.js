 require('dotenv').config();

 const mongo = require('mongodb');

 const mongoClient = mongo.MongoClient;

 const connect = (callback) =>{
   
    mongoClient.connect(process.env.CONNECTION_URL)
    .then((res)=>{
       console.log("Connected")
       callback(res)
    })
    .catch((err)=>{
       console.log(err)
    })
 };

module.exports = {connect};

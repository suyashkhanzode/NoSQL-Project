const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(name,email,password){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    save(){
        const db = getDb();
        return db.collection('user').insertOne(this)
        .then((res)=>{
           return "Saved"
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    static findByUserId(userId){
        const db = getDb();
       
        return db.collection('user').findOne({_id:new mongodb.ObjectId(userId)})
        .then((res)=>{
            return res;
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}

module.exports = User;
const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(title,price,description,imageUrl){
          this.title = title;
          this.price = price;
          this.description = description;
          this.imageUrl = imageUrl;
    }
    save(){
       const db = getDb();
       db.collection('products').insertOne(this)
       .then((res)=>{
         console.log(res)
       })
       .catch((err) =>{
         console.log(err)
       })
    }

    static fetchAll(){
      const db = getDb();
      return db.collection('products').find().toArray()
      .then((res)=>{
        
         return res;
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    static findById(productId){
      const db = getDb();
      return db.collection('products').find({_id :new mongodb.ObjectId(productId)}).next()
      .then((res)=>{
        console.log(res);
        return res;
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    static deleteProduct(productId){
      const db = getDb();
      return db.collection('products').deleteOne({_id :new mongodb.ObjectId(productId)}).next()
      .then((res)=>{
        console.log(res);
        return res;
      })
      .catch((err)=>{
        console.log(err)
      })
    }
}

module.exports = Product;
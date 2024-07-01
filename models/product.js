const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(title,price,description,imageUrl,_id,userId){
          this.title = title;
          this.price = price;
          this.description = description;
          this.imageUrl = imageUrl;
          this._id = _id;
          this.userId = new mongodb.ObjectId(userId);
    }
    save(){
       const db = getDb();
       let dbOp;
       if(this._id){
        const updatedProduct = { ...this };
        delete updatedProduct._id;
        dbOp = db.collection('products').updateOne({_id :new mongodb.ObjectId(this._id)},{$set : updatedProduct})

       }else{
        dbOp = db.collection('products').insertOne(this)
       
       }

      return dbOp.then((res)=>{
        return "Saved"
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
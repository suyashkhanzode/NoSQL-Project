const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');
const { getCartItems } = require('../controllers/shop');

class User {
    constructor(name,email,password,cart,userId){
        this.name = name;
        this.email = email;
        this.password = password;
        this.cart = cart || { items: [] };
        this._id = new mongodb.ObjectId(userId);
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

    addToCart(product){
        const isProductExist = this.cart.items.findIndex((cp)=>{
            return cp.productId.toString() === product._id.toString();
        })
        let quantity = 1;
        const updateCartItems = [...this.cart.items];
        if(isProductExist >= 0){
           quantity = this.cart.items[isProductExist].quantity + 1;
           updateCartItems[isProductExist].quantity = quantity;
        }else{
            updateCartItems.push({productId : new mongodb.ObjectId(product._id),quantity : quantity})
        }
      const updateCart = {items : updateCartItems}
      const db = getDb();
      return db.collection('user').updateOne(
        {_id : new mongodb.ObjectId(this._id)},
        {$set :{cart : updateCart}}
       )
       .then((res) =>{
          return "Added To Cart";
       })
       .catch((err) =>{
         console.log(err);
       })
    }

    getCart(){
      const db = getDb();
      const productIds = this.cart.items.map(i=>{
        return i.productId;
      });
      return db.collection('products').find({_id : {$in :productIds}}).toArray()
      .then((products) =>{
        return products.map(p =>{
            return {...p,quantity : this.cart.items.find(i=>{
                return i.productId.toString() === p._id.toString();
            })}
        })
      })
      .catch((err) =>{
        console.log(err)
      })
    }

    deleteCartItem(productId){
       const updateCartItems = this.cart.items.filter( item =>{
           return item.productId.toString() !== productId.toString();
       })

       const db = getDb();
       return db.collection('user').updateOne(
        {_id : new mongodb.ObjectId(this._id)},
        {$set :{cart : {items : updateCartItems}}}
       )
       .then((res) =>{
          return "Removed From Cart";
       })
       .catch((err) =>{
         console.log(err);
       })
    }

    static findByUserId(userId){
        const db = getDb();
       
        return db.collection('user').findOne({_id:new mongodb.ObjectId(userId)})
        .then((user)=>{
            return new User(user.name,user.email,user.password,user.cart,user._id);
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}

module.exports = User;
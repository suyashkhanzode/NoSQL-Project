const Product = require('../models/product');
const User = require('../models/user');

exports.getAllProducts =async (req,res,next) =>{
    const allProducts = await Product.fetchAll();
    res.status(200).json({result : allProducts})
}

exports.getProductById = async (req,res,next) =>{
    debugger;
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.status(200).json({result : product});
}

exports.addToCart = async (req,res,next) =>{
    const productId = req.params.productId;
    const product = await Product.findById(productId)
    const user = await User.findByUserId('6683b3a8e85685dc120bdf15')
    const result = await user.addToCart(product);
    res.status(201).json({message : result})
}

exports.getCartItems = async (req,res,next) =>{
    const user = await User.findByUserId('6683b3a8e85685dc120bdf15')
    const result = await user.getCart();
    res.status(201).json({message : result})
}

exports.deleteFromCart = async (req,res,next) =>{
    const productId = req.params.productId;
    const user = await User.findByUserId('6683b3a8e85685dc120bdf15')
    const result = await user.deleteCartItem(productId);
    res.status(201).json({message : result})
}
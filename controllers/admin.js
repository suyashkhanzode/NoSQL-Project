const Product = require('../models/product');

exports.addProduct = async (req,res,next) =>{
   
    const {title,price,description,imageUrl} = req.body;
    const p = new Product(title,price,description,imageUrl);
    const result = await  p.save();
    res.status(201).json({message : result});
}

exports.getAllProduct = async (req,res,next) =>{
    const allProducts = await Product.fetchAll();
    res.status(200).json({result :allProducts })
}

exports.updateProduct = async (req,res,next) =>{
    const {title,price,description,imageUrl} = req.body;
    const productId = req.params.productId;
    const p = new Product(title,price,description,imageUrl,productId);
    const result = await p.save();
    res.status(200).json({message : result});
}
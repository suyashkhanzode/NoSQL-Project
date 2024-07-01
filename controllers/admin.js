const Product = require('../models/product');

exports.addProduct = (req,res,next) =>{
    debugger;
    const {title,price,description,imageUrl} = req.body;
    const p = new Product(title,price,description,imageUrl);
    p.save();
    res.status(201).json({message : "Saved"});
}

exports.getAllProduct = async (req,res,next) =>{
    const allProducts = await Product.fetchAll();
    res.status(200).json({result :allProducts })
}
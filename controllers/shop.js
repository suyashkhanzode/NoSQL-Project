const Product = require('../models/product');

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
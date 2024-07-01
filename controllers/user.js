const User = require('../models/user');

exports.addUser = async (req,res,next) =>{
    const {name,email,password} = req.body;
    const u =  new User(name,email,password);
    const result = await u.save();
    res.status(201).json({message:result});
}

exports.findUserById = async (req,res,next) =>{
    const userId = req.params.userId;
    const user = await User.findByUserId(userId);
    res.status(200).json({result : user});
}
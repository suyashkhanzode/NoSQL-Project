const express = require('express');

const route =  express.Router();

const adminController = require('../controllers/admin');

route.post('/add-product',adminController.addProduct);

route.get('/get-product',adminController.getAllProduct);

route.put('/update-product/:productId',adminController.updateProduct)

module.exports = route;
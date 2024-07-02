const express = require('express');

const route =  express.Router();

const shopController = require('../controllers/shop');

route.get('/get-product',shopController.getAllProducts);

route.get('/get-product/:productId',shopController.getProductById);

route.post('/add-to-cart/:productId',shopController.addToCart)

route.get('/get-cart',shopController.getCartItems)

route.delete('/delete-cart/:productId',shopController.deleteFromCart)

route.post('/add-order',shopController.addOrder);

module.exports = route;
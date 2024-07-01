const express = require('express');

const route =  express.Router();

const shopController = require('../controllers/shop');

route.get('/get-product',shopController.getAllProducts);

route.get('/get-product/:productId',shopController.getProductById);

module.exports = route;
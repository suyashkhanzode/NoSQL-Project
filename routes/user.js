const express = require('express');

const route =  express.Router();

const userController = require('../controllers/user');

route.post('/add-user',userController.addUser)

route.get('/get-user/:userId',userController.findUserById)

module.exports = route;
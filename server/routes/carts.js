const express = require('express')
const carts = express.Router()
const cartController = require('../controllers/cartController')
const cartAuthorize = require('../middlewares/cartAuthorize')
const authenticate = require('../middlewares/authenticate')
const checkStock = require('../middlewares/checkStock')

carts.use(authenticate)
carts.get('/', cartController.all)
carts.post('/', checkStock,cartController.create)
carts.use('/:id', cartAuthorize)
carts.put('/:id', checkStock, cartController.update)
carts.delete('/:id', cartController.delete)

module.exports = carts;
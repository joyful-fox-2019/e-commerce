const express = require('express')
const products = express.Router()
const admin = require('../middlewares/admin')
const authenticate = require('../middlewares/authenticate')
const productController = require('../controllers/productController')

products.get('/', productController.all)
products.use(authenticate)
products.patch('/:id', productController.minus)
products.use(admin)
products.post('/', productController.create)
products.get('/:id', productController.one)
products.put('/:id', productController.update)
products.delete('/:id', productController.delete)

module.exports = products;
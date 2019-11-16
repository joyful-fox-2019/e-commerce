const routes = require('express').Router()
const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CartRouter = require('./CartRouter')
const { authentication }= require('../middlewares/authentication')

// routes.use(authentication)
routes.use('/', UserRouter)
routes.use('/product', authentication, ProductRouter)
routes.use('/cart', authentication, CartRouter)

module.exports = routes
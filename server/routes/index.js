const routes = require('express').Router();
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const cartRoutes = require('./cartRoutes')
const transactionsRoutes = require('./transactionsRoutes')

routes.use('/user', userRoutes)
routes.use('/product', productRoutes)
routes.use('/cart', cartRoutes)
routes.use('/transactions', transactionsRoutes)

module.exports = routes
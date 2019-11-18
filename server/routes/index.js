const express = require('express')
const Router = express()
const userRouter = require('./userRoute')
const productRouter = require('./productRoute')
const cartRouter = require('./cartRouter')
const transactionRouter = require('./transactionRouter')


Router.use('/users', userRouter)
Router.use('/products', productRouter)
Router.use('/carts', cartRouter)
Router.use('/transactions', transactionRouter)

module.exports = Router
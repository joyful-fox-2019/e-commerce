`use strict`
const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const transactionRouter = require('./transactionRouter')

router.use('/', userRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)
router.use('/transaction', transactionRouter)

module.exports = router

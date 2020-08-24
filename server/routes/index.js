const router = require('express').Router()

const userRouter = require('./user')
const productRouter = require('./products')
const cartRouter = require('./cart')
const transactionRouter = require('./transaction')

router.get('/', (req, res, next) =>{
  res.status(200).json({ hello : `world`})
})

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)
router.use('/transactions', transactionRouter)

module.exports = router

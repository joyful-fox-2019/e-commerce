const router = require('express').Router()
const usersRouter = require('./users')
const productsRouter = require('./products')
const cartsRouter = require('./carts')
const transactionsRouter = require('./transaction')
const { authentication, customerAuthorization } = require('../middlewares/auth')

router.get('/', (req, res, next) => {
  res.status(200).json({ hello: 'omniverse' })
})

router.use('/users', usersRouter)
router.use('/products', productsRouter)
router.use(authentication)
router.use('/transactions', transactionsRouter)
router.use(customerAuthorization)
router.use('/carts', cartsRouter)

module.exports = router
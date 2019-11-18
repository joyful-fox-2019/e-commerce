const router = require('express').Router()
const userRoutes = require('./user')
const registerRoutes = require('./register')
const loginRoutes = require('./login')
const productRoutes = require('./product')
const cartRoutes = require('./cart')
const transactionRoutes = require('./transaction')

router.use('/users', userRoutes)
router.use('/register', registerRoutes)
router.use('/login', loginRoutes)
router.use('/products', productRoutes)
router.use('/carts', cartRoutes)
router.use('/transactions', transactionRoutes)

module.exports = router
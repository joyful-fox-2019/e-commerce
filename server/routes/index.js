const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const cartRoute = require('./cartRoute')
const transactionsRoute = require('./transactionRoute')
const wishlistRouter = require('./wishlistRoute')

router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/carts', cartRoute)
router.use('/transactions', transactionsRoute)
router.use('/wishlist', wishlistRouter)

module.exports = router
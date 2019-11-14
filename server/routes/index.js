const router = require('express').Router()
const userRoute = require('./user')
const productRoute = require('./product')
const cartRoute = require('./cart')

router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/carts', cartRoute)

module.exports = router

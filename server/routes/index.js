const router = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const cartRoutes = require('./cartRoutes')
const transactionRoutes = require('./transactionRoutes')

router.use('/',userRoutes)
router.use('/product',productRoutes)
router.use('/cart',cartRoutes)
router.use('/transaction',transactionRoutes)

module.exports = router
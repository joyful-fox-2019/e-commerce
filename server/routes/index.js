const router = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const categoryRoutes = require('./categoryRoutes')
const cartRoutes = require('./cartRoutes')
const transactionRoutes = require('./transactionRoutes')

router.use('/', userRoutes)
router.use('/products', productRoutes)
// router.use('/category', categoryRoutes)
// router.use('/carts', cartRoutes)
// router.use('/transactions', transactionRoutes)

module.exports = router
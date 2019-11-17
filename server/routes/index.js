const router = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const categoryRoutes = require('./categoryRoutes')
const imageRoutes = require('./imageRoutes')
const cartRoutes = require('./cartRoutes')
const transactionRoutes = require('./transactionRoutes')

router.use('/', userRoutes)
router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/img', imageRoutes)
router.use('/carts', cartRoutes)
router.use('/transactions', transactionRoutes)

module.exports = router
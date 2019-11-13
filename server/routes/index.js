const router = require('express').Router()
const user = require('./userRoute')
const product = require('./productRoute')

router.use('/user', user)
router.use('/products', product)


module.exports = router

const express = require('express')
const userRoutes = require('./user')
const itemRoutes = require('./item')
const cartRoutes = require('./cart')
const { authentication, authorization } = require('../middlewares/auth')

const router = express.Router()

router.get('/', function(req,res,next) {
    res.status(200).json({
        message: 'You are connected to click server, refers to API documentation for further information'
    })
})

router.use('/click/users', userRoutes)

router.use(authentication)
router.use('/click/items', itemRoutes)
router.use('/click/carts', cartRoutes)

module.exports = router
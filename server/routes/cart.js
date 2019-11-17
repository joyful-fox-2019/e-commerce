const router = require('express').Router()
const cartController = require('../controllers/cart')
const {authentication} = require('../middlewares/auth')


router.use(authentication)
router.get('/', cartController.seeCart)

module.exports = router
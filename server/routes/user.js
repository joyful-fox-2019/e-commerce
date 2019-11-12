const router = require('express').Router()
const userController = require('../controllers/user')
const { authenticate } = require('../middlewares/auth')

router.post('/register', userController.register)
router.get('/verify', userController.verify)
router.post('/login', userController.login)
router.get('/admin/verify', userController.verifyAdmin)
router.post('/admin/register', userController.adminRegister)
router.get('/cart', authenticate, userController.getCart)
router.patch('/cart', authenticate, userController.updateCart)
router.delete('/cart', authenticate, userController.checkout)
router.delete('/cart/:id', authenticate, userController.deleteFromCart)

module.exports = router

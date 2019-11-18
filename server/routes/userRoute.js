const router = require('express').Router()
const UserController = require('../controllers/UserController')
const upload = require('../helpers/gcsUpload')
const { authentication } = require('../middleware/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.patch('/', authentication, upload.single('file'), UserController.update)
router.patch('/test', authentication, UserController.update)
router.get('/', authentication, UserController.find)

module.exports = router

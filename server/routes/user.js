const router = require('express').Router()
const userController = require('../controllers/user')
const {authentication, authorization, roleCheck} = require('../middlewares/auth')
const images = require("../middlewares/images")

router.use(authentication)

router.get('/profile', userController.profile)
router.patch('/topup', userController.topup)

router.use(roleCheck)

router.get('/', userController.ownProducts)
router.post('/', userController.createProduct)
router.post('/upload', images.multer.single('image'), 
images.sendUploadToGCS, userController.upload)
router.patch('/:id',authorization, userController.editProduct)
router.delete('/:id',authorization, userController.deleteProduct)

module.exports = router
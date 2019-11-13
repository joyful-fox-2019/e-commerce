const router = require('express').Router()
    , ProductController = require('../controllers/ProductController')
    , images = require('../middlewares/images')
    , {authentication, adminAuthorization} = require('../middlewares/auth')
    // , cekbody = require('../middlewares/reqBody')

router.post('/',authentication,adminAuthorization,images.multer.single('image'),images.sendUploadToGCS,ProductController.create)
router.get('/',ProductController.read)
router.get('/:id',ProductController.readOne)
router.put('/:id',authentication,adminAuthorization,images.multer.single('image'),images.sendUploadToGCS,ProductController.update)
router.delete('/:id',authentication,adminAuthorization,ProductController.delete)
module.exports = router
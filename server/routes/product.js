const routes = require('express').Router()
const productController = require('../controllers/product')
const gcsUpload = require('gcs-upload')
const { authentication, authorization } = require('../middlewares/auth')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: 'keyfile.json',
        bucketName: 'image-bucket-ecommerce'
    }
})

routes.get('/',productController.findAll)
routes.use(authentication)
routes.get('/myproducts', productController.findMyAll)
routes.patch('/',productController.updateQty)
routes.post('/', upload.array('imgUrl') ,productController.create)
routes.put('/:id', authorization, upload.array('imgUrl'), productController.updateAll)
routes.delete('/:id', authorization, productController.delete)

module.exports = routes
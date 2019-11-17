const routes = require('express').Router()
const userController = require('../controllers/user')
const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: 'keyfile.json',
        bucketName: 'image-bucket-ecommerce'
    }
})

routes.get('/', userController.findAll)
routes.post('/signup', upload.single('imgUrl') ,userController.register)
// routes.post('/signup' ,userController.register)
routes.post('/signin', userController.login)
routes.delete('/:id', userController.delete)

module.exports = routes
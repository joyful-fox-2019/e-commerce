const router = require('express').Router();
const ProductController = require('../controllers/product');
const { multer, sendUploadToGCS } = require('../middlewares/uploader');
const Authenticate = require('../middlewares/authenticate');

router.post('/uploadgcs', Authenticate, multer.single('image'), sendUploadToGCS, ProductController.uploadGCS);

module.exports = router
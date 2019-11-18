const express = require('express');
const router = express.Router();
const userRoute = require('./users')
const productRoute = require('./products')
const cartRoute = require('./carts')
const transactionRoute = require('./transactions')
const admin = require('../middlewares/admin')
const { multer, sendUploadToGCS } = require('../helpers/gcs')

router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/carts', cartRoute)
router.use('/transactions', transactionRoute)
router.use(admin)
router.post('/upload', multer.single('image'), sendUploadToGCS, (req, res) => {
  res.send({
    status: 200,
    message: 'Your file is successfully uploaded',
    link: req.file.cloudStoragePublicUrl
  });
});

module.exports = router;

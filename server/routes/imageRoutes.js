const express = require('express'),
      router = express.Router(),
      images = require('../helpers/images')
  
const imageController = require('../controllers/imageController')

/* GET main endpoint. */
router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS, imageController.imageLink)

module.exports = router
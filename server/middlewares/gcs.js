const multer = require('multer')
const uploadToGcs = require('./gcsUpload')

module.exports = ({ limit, gcsConfig }) => {
  const multerStorage = multer.memoryStorage()
  const upload = multer({ storage: multerStorage, limits })

  return {
    single: (fieldname) => [
      upload.single(fieldname),
      async (req, res, next) => {
        if(req.file && req.body.price && req.body.name && req.body.stock) {
          try {
            req.body[fieldname] = await uploadToGcs({ file: req.file, gcsConfig })
            next()
          } catch (error) {
            next(error)
          }
        } else {
          next ()
        }
      }
    ]
  }
}
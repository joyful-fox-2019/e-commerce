class imageController {
    static imageLink (req, res, next) {

        if (req.file) {
            res.send({
                status: 200,
                message: 'Your file is successfully uploaded',
                link: req.file.cloudStoragePublicUrl
              })
            
        } else {
            res.send({
                status: 200,
                message: 'No file uploaded'
              })
        }
       
    }
}

module.exports = imageController
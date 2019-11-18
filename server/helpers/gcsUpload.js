const multer = require('multer')
const { Storage } = require('@google-cloud/storage')
const fs = require('fs')

const uploadToGcs = async ({ file, gcsConfig }) => {
    const { keyFilename, bucketName } = gcsConfig
    const credentials = JSON.parse(fs.readFileSync(keyFilename, 'utf8'))
    const storage = new Storage({ projectId: credentials.project_id, keyFilename });
    const bucket = storage.bucket(bucketName);
    const filename = `${Date.now()}-${file.originalname}`
    const gcsFile = bucket.file(filename);
    const contents = file.buffer

    await gcsFile.save(contents, {
        metadata: {
            contentType: file.mimetype,
            contentEncoding: file.encoding
        }
    })

    return `https://storage.googleapis.com/${bucketName}/${filename}`
}

const gcsUpload = ({ limits, gcsConfig }) => {
    const multerStorage = multer.memoryStorage()
    const upload = multer({ storage: multerStorage, limits })

    return {
        single: (fieldname) => [
            upload.single(fieldname),
            async (req, res, next) => {
                if (req.file) {
                    try {
                        req.body[fieldname] = await uploadToGcs({ file: req.file, gcsConfig })
                        next()
                    } catch (error) {
                        next(error)
                    }
                } else {
                    next()
                }
            }
        ],

        array: (fieldname, maxCount) => [
            upload.array(fieldname, maxCount),
            async (req, res, next) => {
                try {
                    req.body[fieldname] = await Promise.all(req.files.map(file => uploadToGcs({ file, gcsConfig })))
                    next()
                } catch (error) {
                    next(error)
                }
            }
        ],

        fields: (fields) => [
            upload.fields(fields),
            async (req, res, next) => {
                try {
                    const links = await Promise.all(Object.entries(req.files)
                        .map(async ([fieldname, files]) => ({
                            [fieldname]: await Promise.all(files.map(file =>
                                uploadToGcs({ file, gcsConfig })
                            ))
                        }))
                    )
                    Object.assign(req.body, ...links)
                    next()
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}
 
const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: process.env.KEYFILE_PATH,
      bucketName: process.env.BUCKET_NAME
    }
})

module.exports = upload
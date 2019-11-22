const gcsUpload = require("gcs-upload")

const upload = gcsUpload({
    limits: {
        fileSize: 10000000
    },
    gcsConfig: {
        keyFilename: 'keyfile.json',
        bucketName: process.env.BUCKET_NAME
    }
})

module.exports = upload
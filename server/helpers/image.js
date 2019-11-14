const { Storage } = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: './keyfile.json'
})

module.exports = {
  deleteFileGcs: url => {
    return new Promise((resolve, reject) => {
      const temp = url ? url.split('/') : reject('no url')
      const fileName = temp[temp.length - 1]
      // console.log(storage)

      storage
        .bucket(CLOUD_BUCKET)
        .file(fileName)
        .delete()
        .then(() => {
          resolve(`gs://${CLOUD_BUCKET}/${fileName} deleted.`)
        })
        .catch(reject)
    })
  }
}

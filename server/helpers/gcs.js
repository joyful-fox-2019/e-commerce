'use strict';
require('dotenv').config();

const { Storage } = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET;
const storage = new Storage({
  projectId: process.env.CLOUD_PROJECT,
  keyFilename: process.env.CLOUD_KEYFILE
});
const bucket = storage.bucket(CLOUD_BUCKET);

const getPublicUrl = filename => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
};

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    },
    resumable: false
  });

  stream.on('error', err => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
};

const Multer = require('multer'),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
    // dest: '../images'
  });


const deleteFile = (url) => {
  if (!url.includes('storage.google')) {
    return
  }
  let deleteFile = url;
  let filename = deleteFile.replace(/(https:\/\/storage.googleapis.com\/image-upload-ecommerce.lukywinata.com\/)/, '')

  storage
    .bucket(CLOUD_BUCKET)
    .file(filename)
    .delete()
    .then(() => {
      console.log("File Deleted")
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer,
  deleteFile
};
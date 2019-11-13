const { Storage } = require("@google-cloud/storage");
const GOOGLE_CLOUD_BUCKET = process.env.GOOGLE_CLOUD_BUCKET;

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE
});

const bucket = storage.bucket(GOOGLE_CLOUD_BUCKET);

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${GOOGLE_CLOUD_BUCKET}/${filename}`
}

module.exports = (req, res, next) => {
  
  if(!req.file){
    return next(
    // {
    //   status: 400,
    //   message: `Please upload new image.`
    // }
    );
  } 
  else if (!req.file.mimetype.includes('image/jpeg')){
    return next({
      status: 400,
      message: `File not supported`
    });
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    },
    resumable: false
  });
  
  stream.on('error', (err) => {
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
}
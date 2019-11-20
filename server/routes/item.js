const router = require('express').Router();
const Item = require('../controllers/itemController');
const {
    authentication,
    authorization,
    authorizationRole
} = require('../middleware/auth');
const gcsUpload = require('gcs-upload')
const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: "keyfile.json",
        bucketName: "e-commerce-seal"
    }
})

router.use(authentication)
router.post('/', authorizationRole, upload.single('image'), Item.create)
router.get('/:category', Item.getAll)
router.get('/detail/:id', Item.getDetail)

module.exports = router;
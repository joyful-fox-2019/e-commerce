const router = require('express').Router();
const ProductController = require('../controllers/productController');
const UserController = require('../controllers/userController');
const upload = require("../middlewares/upload")
const authen = require('../middlewares/authen');

router.get('/', ProductController.getAllProduct);
router.get('/user', authen, ProductController.getMyProduct);
router.get('/:id', ProductController.getOneProduct);

router.use(authen);

router.patch('/:id', UserController.addCart);
router.patch('/pull/:id', UserController.deleteCart);
router.put('/:id', upload.single('file'), ProductController.updateProduct)
router.post('/', upload.single('file'), ProductController.addProduct);
router.delete('/:id', ProductController.deleteProduct);


module.exports = router;
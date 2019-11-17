const router = require('express').Router();
const ProductController = require('../controllers/productController');
const UserController = require('../controllers/userController');
const upload = require("../middlewares/upload")
const authen = require('../middlewares/authen');
const author = require('../middlewares/author');

router.get('/', ProductController.getAllProduct);
router.get('/user', authen, ProductController.getMyProduct);
router.get('/:id', ProductController.getOneProduct);

router.use(authen);

router.patch('/:id', author, UserController.addCart);
router.patch('/pull/:id', author, UserController.deleteCart);
router.put('/:id', author, upload.single('file'), ProductController.updateProduct)
router.post('/', upload.single('file'), ProductController.addProduct);
router.delete('/:id', author, ProductController.deleteProduct);


module.exports = router;
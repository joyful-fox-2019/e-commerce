const router = require("express").Router();
const ProductController = require("../controllers/product.js");
const authenticate = require("../middlewares/authenticate.js");
const authorization = require("../middlewares/authorization.js");
const multer = require("../middlewares/multer.js");
const gcs = require("../middlewares/gcs.js");

router.get("/", ProductController.findAll);

router.get("/user", authenticate, ProductController.findUser);
router.post("/", authenticate, multer.single("featured_image"), gcs, ProductController.create);
router.put("/:id", authenticate, authorization, multer.single('featured_image'), gcs, ProductController.update);
router.delete("/:id", authenticate, authorization, ProductController.delete);

router.get("/:id", ProductController.findOne);

module.exports = router;
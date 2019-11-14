const router = require("express").Router();
const { product } = require("../controllers");
const { upload } = require("../middlewares/gcsUpload");
const { authentication, productAuthorization } = require("../middlewares/auth");

router.use(authentication);
router.post("/", upload.single("image"), product.add);
router.get("/", product.get);
router.get("/:id", product.getId);
router.patch("/:id/stock", productAuthorization, product.updateStock);
router.patch("/:id/price", productAuthorization, product.updatePrice);
router.delete('/:id', productAuthorization, product.delete)

module.exports = router;

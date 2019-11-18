const router = require("express").Router();
const { product } = require("../controllers");
const { upload } = require("../middlewares/gcsUpload");
const { authentication, adminAuthorization } = require("../middlewares/auth");

router.get("/", product.get);
router.get("/:id", product.getId);
router.use(authentication);
router.post("/", adminAuthorization, upload.array("images"), product.add);
// router.patch("/:id/stock", productAuthorization, product.updateStock);
// router.patch("/:id/price", productAuthorization, product.updatePrice);
// router.delete('/:id', productAuthorization, product.delete)

module.exports = router;

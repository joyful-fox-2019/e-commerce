const router = require("express").Router();
const UserController = require("../controllers/user.js");
const googleVerifiy = require("../middlewares/googleVerify.js");

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.post("/gsignin", googleVerifiy, UserController.gsignin);

module.exports = router;
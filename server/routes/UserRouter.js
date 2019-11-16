const UserController = require("../controllers/UserController")
const routes = require("express").Router()
const { authentication } = require("../middlewares/authentication")
const ProductController = require('../controllers/ProductController')
const upload = require("../middlewares/gcsUpload")

routes.post("/register", UserController.create)
routes.post("/login", UserController.login)
routes.get("/user", authentication, UserController.findOne)
routes.get("/allProduct", ProductController.findAllProduct)
routes.post("/upload", upload.single('imageData'), (req, res, next) => {
    try {
        console.log('masuk pak eko')
        res.status(200).json(req.body)
    } catch (err) {
        console.log('masuk err')
        next(err)
    }
})

module.exports = routes
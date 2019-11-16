const routes = require("express").Router()
const ProductController = require("../controllers/ProductController")
const { productAuthorization, sellerAuthorization } = require("../middlewares/authorization")

routes.get("/", sellerAuthorization, ProductController.findAll)
routes.get("/:id", sellerAuthorization, productAuthorization,ProductController.findOne)
routes.post("/", sellerAuthorization, ProductController.create)
routes.delete("/:id", sellerAuthorization, productAuthorization, ProductController.delete)
routes.patch("/:id", sellerAuthorization, productAuthorization, ProductController.update)

module.exports = routes
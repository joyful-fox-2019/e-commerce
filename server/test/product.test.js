const fs = require("fs");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { user, product } = require("../models");
const { deleteFileGcs } = require("../helpers/image");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Product Testing", function () {
  this.timeout(20000);
  let newProduct = {
    name: "Asus GeForce RTX 2080 Ti 11GB DDR6 - Strix OC",
    price: 24000000,
    stock: 5
  };
  let newUser = {
    name: "Ahmad Fadilah",
    email: "ahmadfadilah@mail.com",
    password: "ahmadfadilah123"
  };
  let imgUrl = "";
  let userToken = "";
  let userId = "";
  before(function (done) {
    user
      .create(newUser)
      .then(result => {
        userId = result._id;
        chai
          .request(app)
          .post("/users/login")
          .send({
            email: newUser.email,
            password: newUser.password
          })
          .end(function (err, res) {
            if (err) {
              console.log(err);
            } else {
              userToken = res.body.token;
            }
            done();
          });
      })
      .catch(console.log);
  });
  after(function (done) {
    product
      .deleteMany({})
      .then(() => {
        return user.deleteMany({});
      })
      .then(() => {
        if (imgUrl) {
          return deleteFileGcs(imgUrl);
        }
      })
      .then(result => {
        console.log(result);
        imgUrl = "";
        userToken = "";
        done();
      })
      .catch(console.log);
  });
  describe("POST /products", function () {
    describe("Success Testing", function () {
      afterEach(function (done) {
        product
          .deleteMany({})
          .then(() => {
            if (imgUrl) {
              return deleteFileGcs(imgUrl);
            }
          })
          .then(result => {
            console.log(result);
            imgUrl = "";
            done();
          })
          .catch(console.log);
      });
      it("should return created product(ObjectID, name, price, stock, image)", function (done) {
        chai
          .request(app)
          .post("/products")
          .set("token", userToken)
          .field("name", newProduct.name)
          .field("price", newProduct.price)
          .field("stock", newProduct.stock)
          .attach(
            "image",
            fs.readFileSync("./test/img/AS-GF-RTX2080Ti.jpg"),
            "AS-GF-RTX2i.jpg"
          )
          .end(function (err, res) {
            imgUrl = res.body.image;
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "name",
                "price",
                "stock",
                "image",
                "seller",
                "createdAt",
                "updatedAt"
              );
            expect(res.body.name)
              .to.be.a("string")
              .to.equal(newProduct.name);
            expect(res.body.price)
              .to.be.a("number")
              .to.equal(newProduct.price);
            expect(res.body.stock)
              .to.be.a("number")
              .to.equal(newProduct.stock);
            done();
          });
      });
    });
    describe("Error Testing", function () {
      afterEach(function (done) {
        product
          .deleteMany({})
          .then(() => {
            if (imgUrl) {
              return deleteFileGcs(imgUrl);
            }
          })
          .then(result => {
            console.log(result);
            imgUrl = "";
            done();
          })
          .catch(console.log);
      });
      it("should send an error with 400 status code because no user login", function (done) {
        chai
          .request(app)
          .post("/products")
          .field("name", newProduct.name)
          .field("price", newProduct.price)
          .field("stock", newProduct.stock)
          .attach(
            "image",
            fs.readFileSync("./test/img/AS-GF-RTX2080Ti.jpg"),
            "AS-GF-RTX2i.jpg"
          )
          .end(function (err, res) {
            imgUrl = res.body.image;
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message)
              .to.be.an("array")
              .that.includes("no user login");
            done();
          });
      });
      it('should return "Please login again" with status code 400 when unknown token', function (done) {
        let invalidToken = "12345salahtoken";
        chai
          .request(app)
          .post("/products")
          .set("token", invalidToken)
          .field("name", newProduct.name)
          .field("price", newProduct.price)
          .field("stock", newProduct.stock)
          .attach(
            "image",
            fs.readFileSync("./test/img/AS-GF-RTX2080Ti.jpg"),
            "AS-GF-RTX2i.jpg"
          )
          .end(function (err, res) {
            imgUrl = res.body.image;
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message)
              .to.be.an("array")
              .that.includes("Please login again");
            done();
          });
      });
      it('should return "Product name is required" with status code 400 when submit form without name', function (done) {
        chai
          .request(app)
          .post("/products")
          .set("token", userToken)
          .field("price", newProduct.price)
          .field("stock", newProduct.stock)
          .attach(
            "image",
            fs.readFileSync("./test/img/AS-GF-RTX2080Ti.jpg"),
            "AS-GF-RTX2i.jpg"
          )
          .end(function (err, res) {
            imgUrl = res.body.image;
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message)
              .to.be.an("array")
              .that.includes("Product name is required");
            done();
          });
      });
      it('should return "Price is required" with status code 400 when submit form without price', function (done) {
        chai
          .request(app)
          .post("/products")
          .set("token", userToken)
          .field("name", newProduct.name)
          .field("stock", newProduct.stock)
          .attach(
            "image",
            fs.readFileSync("./test/img/AS-GF-RTX2080Ti.jpg"),
            "AS-GF-RTX2i.jpg"
          )
          .end(function (err, res) {
            imgUrl = res.body.image;
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message)
              .to.be.an("array")
              .that.includes("Price is required");
            done();
          });
      });
      it('should return "stock is required" with status code 400 when submit form without stock', function (done) {
        chai
          .request(app)
          .post("/products")
          .set("token", userToken)
          .field("name", newProduct.name)
          .field("price", newProduct.price)
          .attach(
            "image",
            fs.readFileSync("./test/img/AS-GF-RTX2080Ti.jpg"),
            "AS-GF-RTX2i.jpg"
          )
          .end(function (err, res) {
            imgUrl = res.body.image;
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message)
              .to.be.an("array")
              .that.includes("stock is required");
            done();
          });
      });
    });
  });
  describe("GET /products", function () {
    before(function (done) {
      let products = [
        {
          name: "Asus GeForce RTX 2080 Ti 11GB DDR6 - Strix OC",
          price: 24000000,
          stock: 5,
          seller: userId
        },
        {
          name: "Gigabyte GeForce RTX 2080 8GB DDR6 Aorus - GV-N2080AORUS-8GC",
          price: 11960000,
          stock: 6,
          seller: userId
        },
        {
          name: "Asus GeForce RTX 2060 SUPER 8GB DDR6 - Strix Advance",
          price: 7600000,
          stock: 4,
          seller: userId
        }
      ];
      product
        .insertMany(products)
        .then((result) => {
          done()
        })
        .catch(console.log());
    });
    after(function (done) {
      product
        .deleteMany({})
        .then(() => done())
        .catch(console.log());
    });
    describe("Success Testing", function () {
      it("should return product list from database", function (done) {
        chai
          .request(app)
          .get("/products")
          .set("token", userToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("array")
              .to.have.lengthOf(3);
            expect(res.body[0])
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "name",
                "price",
                "stock",
                "seller",
                "createdAt",
                "updatedAt"
              );
            done();
          });
      });
    });
    describe("Error Testing", function () {
      it("should return product list from should send an error with 400 status code because no user login", function (done) {
        chai
          .request(app)
          .get("/products")
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message)
              .to.be.an("array")
              .that.includes("no user login");
            done();
          });
      });
    });
  });
  describe("GET /products/:id", function () {
    let createdProduct = {};
    before(function (done) {
      const productDummy = { ...newProduct, seller: userId };
      product
        .create(productDummy)
        .then(result => {
          createdProduct = result;
          done();
        })
        .catch(console.log);
    });
    after(function (done) {
      product
        .findByIdAndDelete(createdProduct._id)
        .then(() => done())
        .catch(console.log);
    });
    describe("Success Testing", function () {
      it("should return product id", function (done) {
        chai
          .request(app)
          .get(`/products/${createdProduct._id}`)
          .set("token", userToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "name",
                "price",
                "stock",
                "seller",
                "createdAt",
                "updatedAt"
              );
            done();
          });
      });
    });
    describe("Error Testing", function () {
      it("should send an error with 400 status code because no user login", function (done) {
        chai
          .request(app)
          .get(`/products/${createdProduct._id}`)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("message");
            expect(res.body.message)
              .to.be.an("array")
              .that.includes("no user login");
            done();
          });
      });
    });
  });
  describe("PATCH /products/:id/... (update stock and price)", function () {
    let createdProduct = {};
    before(function (done) {
      const productDummy = { ...newProduct, seller: userId };
      product
        .create(productDummy)
        .then(result => {
          createdProduct = result;
          done();
        })
        .catch(console.log);
    });
    after(function (done) {
      product
        .findByIdAndDelete(createdProduct._id)
        .then(() => done())
        .catch(console.log);
    });
    describe("Success Testing", function () {
      it("Should return old data product before update", function (done) {
        chai
          .request(app)
          .patch(`/products/${createdProduct._id}/stock`)
          .set("token", userToken)
          .send({
            stock: 10
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "name",
                "price",
                "stock",
                "seller",
                "createdAt",
                "updatedAt"
              );
            done();
          });
      });
      it("Should return old data product before update", function (done) {
        chai
          .request(app)
          .patch(`/products/${createdProduct._id}/price`)
          .set("token", userToken)
          .send({
            price: 20000000,
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "name",
                "price",
                "stock",
                "seller",
                "createdAt",
                "updatedAt"
              );
            done();
          });
      });
    });
  });
  describe("DELETE /products/:id", function () {
    let createdProduct = {};
    before(function (done) {
      const productDummy = { ...newProduct, seller: userId };
      product
        .create(productDummy)
        .then(result => {
          createdProduct = result;
          done();
        })
        .catch(console.log);
    });
    after(function (done) {
      product
        .findByIdAndDelete(createdProduct._id)
        .then(() => done())
        .catch(console.log);
    });
    describe("Success Testing", function () {
      it("should deleted product id", function (done) {
        chai
          .request(app)
          .delete(`/products/${createdProduct._id}`)
          .set("token", userToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "name",
                "price",
                "stock",
                "seller",
                "createdAt",
                "updatedAt"
              );
            done();
          });
      });
    });
  })
});

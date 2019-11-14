const fs = require("fs");
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const { user, product, cart } = require('../models')
const { deleteFileGcs } = require("../helpers/image");

const expect = chai.expect
chai.use(chaiHttp)

describe('Cart Testing', function () {
  this.timeout(20000);
  let imgUrl = "";
  let userToken = "";
  let userId = "";
  let productId = "";
  let cartId = "";
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
  before(function (done) {
    chai
      .request(app)
      .post('/users/register')
      .send(newUser)
      .then(res => {
        userId = res.body._id
        return chai
          .request(app)
          .post("/users/login")
          .send({
            email: newUser.email,
            password: newUser.password
          })
      })
      .then(res => {
        userToken = res.body.token;
        return chai
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
      })
      .then(res => {
        imgUrl = res.body.image;
        productId = res.body._id
        done()
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
        return cart.deleteMany({})
      })
      .then(() => {
        if (imgUrl) {
          return deleteFileGcs(imgUrl)
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
  describe('POST /carts', function () {
    describe('Success Testing', function () {
      it('should return cart', function (done) {
        chai
          .request(app)
          .post("/carts")
          .set("token", userToken)
          .send({
            ProductId: productId,
            qty: 1
          })
          .end(function (err, res) {
            cartId = res.body._id
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "UserId",
                "ProductId",
                "qty",
                "createdAt",
                "updatedAt"
              );
            expect(res.body.UserId)
              .to.be.a("string")
              .to.equal(userId);
            expect(res.body.ProductId)
              .to.be.a("string")
              .to.equal(productId);
            expect(res.body.qty)
              .to.be.a("number")
              .to.equal(1);
            done();
          });
      })
    })
  })
  describe('DELETE /carts', function () {
    describe('Success Testing', function () {
      it('should deleted cart id', function (done) {
        chai
          .request(app)
          .delete(`/carts/${cartId}`)
          .set("token", userToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "UserId",
                "ProductId",
                "qty",
                "createdAt",
                "updatedAt"
              );
            done();
          });
      })

    })
  })
})
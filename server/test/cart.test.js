const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Cart = require('../models/cart')

chai.use(chaiHttp)
const expect = chai.expect

let adminToken = null
let customerToken = null
let cartId = null
let productId = null

// Create User Account to Database
before(function (done) {
  const adminData = {
    name: 'cartadmin',
    email: 'cart@admin.com',
    password: 'cartAdmin',
    isAdmin: true,
    city: 'Jakarta'
  }
  const customerData = {
    name: 'Winata',
    email: 'winata@email.com',
    password: '12345',
    isAdmin: false,
    city: ' Jakarta'
  }
  let promises = [User.create(adminData), User.create(customerData)]
  Promise.all(promises)
    .then(users => {
      console.log('testing: success create initial user')
      done()
    })
    .catch(console.log)
})

// Clear Database After Testing
after(function (done) {
  if (process.env.NODE_ENV === 'testing') {
    let promises = [User.deleteMany({}), Cart.deleteMany({})]
    Promise.all(promises)
      .then(() => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

describe('Give Access Token to Customer for Testing', function () {
  it('should give status 200 and access token to admin', function (done) {
    let user = {
      'email': 'cart@admin.com',
      'password': 'cartAdmin',
    }
    chai
      .request(app)
      .post('/users/login')
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        adminToken = res.body.access_token
        done();
      })
  })
  it('should give status 200 and access token to customer', function (done) {
    let user = {
      'email': 'winata@email.com',
      'password': '12345',
    }
    chai
      .request(app)
      .post('/users/login')
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        customerToken = res.body.access_token
        done();
      })
  })
})

describe('Create Product to Test Cart Routes', function () {
  it('should give status 200 and create product for testing', function (done) {
    let product = {
      name: 'Helm Arai',
      stock: 100,
      price: 1000000
    }
    chai
      .request(app)
      .post('/products')
      .set('access_token', adminToken)
      .send(product)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        productId = res.body._id
        done();
      })
  })
})

describe('Cart Routes', function () {
  describe('POST /carts', function () {
    context('-----Success Process-----', function () {
      it('should response with status 201 and give cart data', function (done) {
        chai
          .request(app)
          .post('/carts')
          .set('access_token', customerToken)
          .send({
            product: productId,
            quantity: 10
          })
          .end(function (err, res) {
            cartId = res.body._id;
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys("UserId", "product", "quantity", "isCheckout")
            done()
          })
      })
    })
    context('-----Error Process-----', function () {
      it('should failed to give authorized because user was not logged in', function (done) {
        chai
          .request(app)
          .post('/carts')
          .send({
            product: productId,
            quantity: 10
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('jwt must be provided')
            done()
          })
      })
      it('should give an error because of negative quantity', function (done) {
        chai
          .request(app)
          .post('/carts')
          .set('access_token', customerToken)
          .send({
            product: productId,
            quantity: -1
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Quantity must be greater than zero')
            done()
          })
      })
    })
  })
  describe('GET /carts', function () {
    context('-----Success Process-----', function () {
      it('should give status 200 and response with user carts data', function (done) {
        chai
          .request(app)
          .get("/carts")
          .set('access_token', customerToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array")
            res.body.forEach(element => {
              expect(element).to.have.any.keys("UserId", "product", "quantity", "isCheckout")
            });
            done()
          });
      })
    })
    context('-----Error Process-----', function () {
      it('should give an error 401 because user is not authenticated', function (done) {
        chai
          .request(app)
          .get("/carts")
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('jwt must be provided')
            done()
          });
      })
    })
  })
  describe('UPDATE /carts/id', function () {
    context('-----Success Process-----', function () {
      it('successfully updated with code 200', function (done) {
        chai
          .request(app)
          .put(`/carts/${cartId}`)
          .set('access_token', customerToken)
          .send({
            product: productId,
            quantity: 100
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys("UserId", "product", "quantity", "isCheckout")
            done()
          })
      })
    })
    context('-----Error Process-----', function () {
      it('should fail when id is not found in database', function (done) {
        chai
          .request(app)
          .put(`/carts/asdasdasd`)
          .set('access_token', customerToken)
          .send({
            product: productId,
            quantity: 100
          })
          .end(function (err, res) {
            expect(res).to.have.status(500);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys('message', 'errors')
            done()
          })
      })
    })
  })
  describe('DELETE /carts', function () {
    context('-----Error Process-----', function () {
      it('should fail to give authorized because user was not logged in', function (done) {
        chai
          .request(app)
          .delete(`/carts/${cartId}`)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('jwt must be provided')
            done()
          })
      })
    })
    context('-----Success Process-----', function () {
      it('should response with status 200 and delete the cart', function (done) {
        chai
          .request(app)
          .delete(`/carts/${cartId}`)
          .set('access_token', customerToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys('product', 'quantity')
            done()
          })
      })
    })
  })
})
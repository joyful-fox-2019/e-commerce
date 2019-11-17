const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')

chai.use(chaiHttp)
const expect = chai.expect

// Create User Account to Database
before(function (done) {
  const adminData = {
    name: 'admin',
    email: 'admin@admin.com',
    password: 'ecommerceAdmin',
    isAdmin: true,
    city: 'Jakarta'
  }
  const customerData = {
    name: 'Luky',
    email: 'luky@email.com',
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
    let promises = [User.deleteMany({}), Product.deleteMany({})]
    Promise.all(promises)
      .then(() => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

let adminToken = null
let customerToken = null
let productId = null

describe('Give Access Token to Admin and Customer for Testing', function () {
  it('should give status 200 and access token to admin', function (done) {
    let user = {
      'email': 'admin@admin.com',
      'password': 'ecommerceAdmin'
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
      'email': 'luky@email.com',
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

describe('Product Routes', function () {
  describe('POST /products', function () {
    context('-----Success Process-----', function () {
      it('should response with status 201 and give product data', function (done) {
        chai
          .request(app)
          .post('/products')
          .set('access_token', adminToken)
          .send({
            name: 'Helm Arai',
            quantity: 'ImageURL',
            price: 100000,
            stock: 8
          })
          .end(function (err, res) {
            productId = res.body._id;
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys('name', 'image', 'price', 'stock')
            done()
          })
      })
    })
    context('-----Error Process-----', function () {
      it('should not give access to any user but admin', function (done) {
        chai
          .request(app)
          .post('/products')
          .set('access_token', customerToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(403);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Unauthorized Access')
            done()
          })
      })
      it('should give an error because of uninputted name', function (done) {
        chai
          .request(app)
          .post('/products')
          .set('access_token', adminToken)
          .send({
            image: 'ImageURL',
            price: 100000,
            stock: 8
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Name must be defined')
            done()
          })
      })
      it('should give an error because of negative price', function (done) {
        chai
          .request(app)
          .post('/products')
          .set('access_token', adminToken)
          .send({
            name: 'Helm Arai',
            image: 'ImageURL',
            price: -10000,
            stock: 8
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Price must be minimum 0')
            done()
          })
      })
      it('should give an error because of negative price', function (done) {
        chai
          .request(app)
          .post('/products')
          .set('access_token', adminToken)
          .send({
            name: 'Helm Arai',
            image: 'ImageURL',
            price: 10000,
            stock: -8
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Stock must be minimum 0')
            done()
          })
      })
    })
  })
  describe('GET /products', function () {
    context('-----Success Process-----', function () {
      it('should get product data with status 200 with no error', function (done) {
        chai
          .request(app)
          .get('/products')
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            res.body.forEach(element => {
              expect(element).to.have.any.keys('name', 'image', 'price', 'stock')
            })
            done()
          })
      })
    })
  })
  describe('GET /products/id', function () {
    context('-----Success Process-----', function () {
      it('should get product data with status 200 with no error', function (done) {
        chai
          .request(app)
          .get(`/products/${productId}`)
          .set('access_token', adminToken)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.any.keys('name', 'image', 'price', 'stock')
            done()
          })
      })
    })
    context('-----Error Process-----', function () {
      it('failed when id is not found in database', function (done) {
        chai
          .request(app)
          .get(`/products/asdasdasd`)
          .set('access_token', adminToken)
          .end(function (err, res) {
            expect(res).to.have.status(500);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys('message', 'errors')
            done()
          })
      })
    })
  })
  describe('UPDATE /products/id', function () {
    context('-----Success Process-----', function () {
      it('success updated with code 200', function (done) {
        chai
          .request(app)
          .put(`/products/${productId}`)
          .set('access_token', adminToken)
          .send({
            name: 'Helm Arai',
            image: 'ImageURL',
            price: 10000,
            stock: 8
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys('name', 'image', 'price', 'stock')
            done()
          })
      })
    })
    context('-----Error Process-----', function () {
      it('failed when id is not found in database', function (done) {
        chai
          .request(app)
          .put(`/products/asdasdasd`)
          .set('access_token', adminToken)
          .send({
            name: 'Helm Arai',
            image: 'ImageURL',
            price: 10000,
            stock: 8
          })
          .end(function (err, res) {
            expect(res).to.have.status(500);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys('message', 'errors')
            done()
          })
      })
      it('failed to update when token is not admin', function (done) {
        chai
          .request(app)
          .put(`/products/${productId}`)
          .set('access_token', customerToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(403);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Unauthorized Access')
            done()
          })
      })
    })
  })
  describe('DELETE /products/id', function () {
    context('-----Error Process-----', function () {
      it('failed when id is not found in database', function (done) {
        chai
          .request(app)
          .delete(`/products/asdasdasd`)
          .set('access_token', adminToken)
          .end(function (err, res) {
            expect(res).to.have.status(500);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys('message', 'errors')
            done()
          })
      })
      it('failed to delete when token is not admin', function (done) {
        chai
          .request(app)
          .delete(`/products/${productId}`)
          .set('access_token', customerToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(403);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Unauthorized Access')
            done()
          })
      })
    })
    context('-----Success Process-----', function () {
      it('success deleted with code 200', function (done) {
        chai
          .request(app)
          .delete(`/products/${productId}`)
          .set('access_token', adminToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys('name', 'image', 'price', 'stock')
            done()
          })
      })
    })
  })
})

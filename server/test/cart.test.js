const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');
const Product = require('../models/product');
const Store = require('../models/Store');
const { signToken } = require('../helpers/jwt')
const Cart = require('../models/cart')

chai.use(chaiHttp)
const expect = chai.expect;

let initialId = '';
var firstToken = '';
var initialProduct = '';
var initialStore = '';
var initialUser = ''
var initialCart = ''

var data = {
  condition: 'new',
  description: 'new Product',
  name: 'product',
  price: 1000,
  stock: 10,
  product_image: 'http://lala.com'
}

var falseId = '748jrp32njnfjfnfdfa'
var falseToken = 'wifjpw3ihgi42-hf924-fji3fj-fji3fjei0fs'

before(function (done) {
  User.create({ username: 'eric', email: 'ericsudhartio@mgail.com', password: 'lalalalala' })
    .then(user => {
      initialId = user._id
      initialUser = user;
      const token = signToken({ id: user._id, username: user.username, email: user.email })
      firstToken = token;
      user.verification = true;
      return Store.create({
        name: 'bambang22',
        location: 'jakarta selatan',
        link: 'store jakarta',
        id: user._id
      })
    })
    .then(store => {
      initialUser.StoreId = store._id
      data.StoreId = store._id
      initialStore = store;
      return Product.create(data)
    })
    .then(product => {
      initialStore.ProductId.push(product._id)
      initialProduct = product
      return Cart.create({ UserId: initialUser._id })
    })
    .then(cart => {
      initialCart = cart
      done()
    })
    .catch(console.log)
})

after(function (done) {
  if(process.env.NODE_ENV == 'testing') {
    Cart.deleteMany({})
      .then(() => {
        console.log('testing: delete data cart success!');
        return User.deleteMany({})
      })
      .then(() => {
        console.log('testing: delete data User success')
        return Product.deleteMany({})
      })
      .then(() => {
        console.log('testing: delete data Product success')
        return Store.deleteMany({})
      })
      .then(() => {
        console.log('testing: delete data Store Success')
        done()
      })
      .catch(console.log)
  }
})
describe('cartRoutes', function () {
  this.timeout(10000)
  describe('POST /carts', function () {
    let product = {
      product_image: 'http://lalalala.com',
      description: 'dnakf;adsnkfasf',
      name: 'product name',
      price: 900,
      count: 1,
      storeName: 'fjdsakfa',
      stock: 12
    }
    let link = '/carts'
    describe('success process', function () {
      it('should send an object with 201 status code', function (done) {
        product.id = initialProduct._id;
        product.storeId = initialStore._id
        chai.request(app)
          .post(link)
          .send(product)
          .set('token', firstToken)
          .end(function(err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            // expect(res.body).to.be.an('object').to.have.any.keys('msg', 'cart')
            // expect(res.body.msg).to.equal('success add to cart')
            done()
          })
      })
    })
    describe('error process', function () {
      it('should send an error with status 403 because authentication', function (done) {
        chai.request(app)
          .post(link)
          .send(product)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Authentication Error')
            done()
          })
      })
      it('should send an error with status 400 because Authentication Error', function (done) {
        chai.request(app)
          .post(link)
          .send(product)
          .set('token', falseToken)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Authentication Error')
            done()
          })
      })
    })
  })
  describe('GET /carts', function () {
    const link = '/carts'
    describe('success progress', function () {
      it('should send an object with 200 status code', function (done) {
        chai.request(app)
          .get(link)
          .set('token', firstToken)
          .end(function(err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
          })
      })
    })
    describe('error process', function () {
      it('should send an error with status 403 because authentication', function (done) {
        chai.request(app)
          .get(link)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Authentication Error')
            done()
          })
      })
      it('should send an error with status 400 because Authentication Error', function (done) {
        chai.request(app)
          .get(link)
          .set('token', falseToken)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Authentication Error')
            done()
          })
      })
    })
  })

  describe('PUT /carts/:name', function () {
    let newproduct = {
      product_image: 'http://lalalala.com',
      description: 'dnakf;adsnkfasf',
      name: 'product name',
      price: 900,
      count: 1,
      storeName: 'fjdsakfa',
      stock: 12
    }
    const link = `/carts/product name`
    describe('success progress', function () {
      it('should send an object with 200 status code', function (done) {
        chai.request(app)
          .put(link)
          .send(newproduct)
          .set('token', firstToken)
          .end(function(err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
          })
      })
    })
    describe('error process', function () {
      it('should send an error with status 403 because authentication', function (done) {
        chai.request(app)
          .put(link)
          .send(newproduct)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Authentication Error')
            done()
          })
      })
      it('should send an error with status 400 because Authentication Error', function (done) {
        chai.request(app)
          .put(link)
          .send(newproduct)
          .set('token', falseToken)
          .end(function (err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Authentication Error')
            done()
          })
      })
    })
  })
})



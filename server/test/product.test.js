// require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')
const Product = require('../models/product')
const User = require('../models/user')
const { genToken } = require('../helpers/jwt')
const app = require('../app')

const expect = chai.expect
chai.use(chaiHttp)

let admin = {
  username: 'admin',
  email: 'admin@admin.com',
  password: 'admin123',
  role: 'admin'
}

let customer = {
  username: 'customer',
  email: 'cust@omer.com',
  password: 'customer123'
}

let token = ''
let customerToken = ''

before( async () => {
  try {
    const user = await User.create(admin)
    token = await genToken({ id: user._id, role: user.role})
    const cust = await User.create(customer)
    customerToken = await genToken({ id: cust._id, role: cust.role})
    console.log('user created, product-test : 31');
  }
  catch(err){
    console.log(err)
  }
})

after((done) => {
  if(process.env.NODE_ENV === 'test') {
    User.deleteMany()
      .then(()=> {
        console.log('initial user deleted')
        return Product.deleteMany()
      })
      .then(()=> {
        console.log('product test finished')
        done()
      })
      .catch(console.log)
      
  }
})

describe('Product Test', function () {
  describe('POST /products', function () {
    it('Should return object of (product, message) with status 201 when successfully created product', function (done) {
    setTimeout(() => { 
      chai
      .request(app)
      .post('/products')
      .field('name', 'new product')
      .field('stock', 10)
      .field('price', 12345)
      .attach('image', '/home/mrdn/Downloads/profpic.jpg', 'profpic.jpg')
      .set('token', token)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object').to.have.any.keys('product','message')
        expect(res.body.product).to.be.an('object').to.have.any.keys('stock', 'price', 'favourites', 'name', 'sold', 'image', 'viewed')
      })
    }, 5000);
    done()
    })
    it('Should return object of (message, errors) with status 400 when name field is empty', function(done){
    setTimeout(() => { 
      chai
      .request(app)
      .post('/products')
      .field('stock', 10)
      .field('price', 12345)
      .attach('image', '/home/mrdn/Downloads/profpic.jpg', 'profpic.jpg')
      .set('token', token)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(400)
        expect(res.body.message).to.be.equal('Validation Error')
        expect(res.body).to.be.an('object').to.have.any.keys('message')
        expect(res.body.errors).to.be.an('array').that.includes('Product name is required')
      })
    }, 5000);
    done()
    })
    it('Should return object of (message, errors) with status 400 when price field is empty', function(done){
    setTimeout(() => { 
      chai
      .request(app)
      .post('/products')
      .field('name', 'new product')
      .attach('image', '/home/mrdn/Downloads/profpic.jpg', 'profpic.jpg')
      .set('token', token)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(400)
          expect(res.body.message).to.be.equal('Validation Error')
          expect(res.body).to.be.an('object').to.have.any.keys('message')
        expect(res.body.errors).to.be.an('array').that.includes('Price is required')
      })
    }, 5000);
    done()
    })
    it('Should return object of (message, errors) with status 400 when image is empty', function(done){
      setTimeout(() => { 
        chai
        .request(app)
        .post('/products')
        .field('name', 'new product')
        .field('price', 12345)
        .set('token', token)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('product', 'message')
          expect(res.body.message).to.be.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Product image is required')
        })
      }, 5000);
      done()
      })
    it('Should return object of (message) with status 401 when token is not set', function(done){
      setTimeout(() => { 
        chai
        .request(app)
        .post('/products')
        .field('name', 'new product')
        .attach('image', '/home/mrdn/Downloads/profpic.jpg', 'profpic.jpg')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('product', 'message')
          expect(res.body.message).to.be.equal('You must login first')
        })
      }, 5000);
      done()
    })
    it('should return object of (message) with status 403 when user is not admin', function (done) {
      setTimeout(() => { 
        chai
        .request(app)
        .post('/products')
        .field('stock', 10)
        .field('price', 12345)
        .attach('image', '/home/mrdn/Downloads/profpic.jpg', 'profpic.jpg')
        .set('token', customerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(403)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.equal('Authorization failed')
        })
      }, 5000);
    done()
    })
  })
  describe('GET /products', function () {
    it('Should return array of objects with status 200 when get products', function(done){
      chai
        .request(app)
        .get('/products')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })
  describe('GET /products/:id', function () {
    let productId
    before( (done) => {
      Product.create({ name: 'namename', 'price': 12345, 'image': 'image.png'})
        .then(product => {
          productId = product._id
          done()
        })
        .catch(console.log)
    })
    it('Should return product object with status 200 when get product by id', function(done){
      console.log(productId, 'ID product, line 194');
      chai
        .request(app)
        .get(`/products/${productId}`)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('name', 'stock', 'price', 'sold', 'favourites', 'image')
          done()
        })
    })
  })
})

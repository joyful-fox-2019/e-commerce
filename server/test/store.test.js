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
  let tempUser 
  User.create({ username: 'eric', email: 'ericsudhartio@mgail.com', password: 'lalalalala' })
    .then(user => {
      initialId = user._id
      tempUser = user;
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
      tempUser.StoreId = store._id
      data.StoreId = store._id
      initialStore = store;
      return Product.create(data)
    })
    .then(product => {
      initialStore.ProductId.push(product._id)
      initialProduct = product
      return Cart.create({ UserId: tempUser._id })
    })
    .then(cart => {
      initialCart = cart
      return User.findByIdAndUpdate(tempUser._id, { verification: true }, {new:true})
    })
    .then(user => {
      console
      initialUser = user;
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

describe('Store Route', function () {
  this.timeout(10000)
  describe('POST /stores', function () {
    let store = {
      name: 'store name',
      location: 'palembang',
      link: 'linkapa.js'
    }
    let link = '/stores'
    describe('success process', function () {
      it('should send an object with 201 status code', function (done) {
        let store2 = {
          name: 'store name',
          location: 'palembang',
          link: 'linkapa.js'
        }
        console.log(initialUser, '/////???')
        chai.request(app)
          .post(link)
          .set('token', firstToken)
          .send(store2)
          .end(function(err,res) {
            console.log(firstToken)
            expect(err).to.be.null
            expect(res).to.have.status(201)
            // expect(res.body).to.be.an('object').to.have.any.keys('msg', 'cart')
            // expect(res.body.msg).to.equal('success add to cart')
            done()
          })
      })
    })
    describe('error process', function () {
      it('should send an error with status 400 because empty name', function (done) {
        const noName = { ...store }
        delete noName.name
        chai.request(app)
          .post(link)
          .set('token', firstToken)
          .send(noName)
          .end(function (err,res ) {
            expect(err).to.be.null;
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error');
            expect(res.body.errors).to.be.an('array').that.includes('name is required')
            done()
          })
      })
      it('should send an error with status 400 becausr empty location', function (done) {
        const noLocation = { ...store }
        delete noLocation.location;
        chai.request(app)
          .post(link)
          .set('token', firstToken)
          .send(noLocation)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error');
            expect(res.body.errors).to.be.an('array').that.includes('location is required')
            done()
          })
      })
      it('should send an error with status 400 because empty link', function (done) {
        const noLink = { ...store }
        delete noLink.link
        chai.request(app)
          .post(link)
          .send(noLink)
          .set('token', firstToken)
          .end(function(err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error');
            expect(res.body.errors).to.be.an('array').that.includes('link is required')
            done()
          })
      })
      it('should send an error with status 403 because authentication', function (done) {
        chai.request(app)
          .post(link)
          .send(store)
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
          .send(store)
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
  describe('GET /stores', function () {
    let link = '/stores'
    it('should send an error with status 403 because authentication', function (done) {
      chai.request(app)
        .post(link)
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
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp)
const Product = require('../models/Product')
const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
let adminToken = ''
let customerToken = ''
let productId = ''
const fs = require('fs')

describe('Product Test', function () {
  this.timeout(10000)
  before(function (done) {
    User.create({
      name: 'Tony Stark',
      email: 'tony@stark.com',
      password: 'iamironman',
      isAdmin: true
    })
      .then(user => {
        console.log(user)
        const { _id, email } = user
        adminToken = generateToken({ _id, email })
        return User.create({
          name: 'Peter Parker',
          email: 'parker@bugle.com',
          password: 'webhead'
        })
      })
      .then(user => {
        const { _id, email } = user
        customerToken = generateToken({ _id, email })
        done()
      })
      .catch(console.log)
  })
  after(function (done) {
    Product.deleteMany({})
      .then(_ => {
        return User.deleteMany({})
      })
      .then(_ => {
        done()
      })
      .catch(console.log)
  })
  describe('create product', function () {
    it('should return _id, name, description, price, stock, published, writer, penciler, createdAt, updatetAd when input is complete and valid', function (done) {
      let body = {
        name: 'Runaways (2017) #27',
        description: 'JUSTICE IS SERVED! The Runaways can’t go home, but Los Angeles’ First Protector and Most Venerable Hero has taken them in! Have they FINALLY met a powerful adult they can trust? To fight by his side, they’ll have to leave one of their own behind! And without a soul to feast on, Gib is fading fast. Sounds like a ticking clock…',
        published: '2019-11-13',
        price: 3.99,
        stock: 5,
        writer: 'Rainbow Rowell',
        penciler: 'Andres Genolet'
      }

      chai.request(app)
      .post('/products')
      .type('form')
      .attach('image', fs.readFileSync('./futurefoundation4.jpg'), './futurefoundation4.jpg')
      .field('name', body.name)
      .field('description', body.description)
      .field('published', body.published)
      .field('price', body.price)
      .field('stock', body.stock)
      .field('writer', body.writer)
      .field('penciler', body.penciler)
      .set('access_token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('_id', 'name', 'description', 'price', 'stock', 'published', 'writer', 'penciler', 'createdAt', 'updatedAt', 'image')

        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.description).to.be.a('string')
        expect(res.body.price).to.be.a('number')
        expect(res.body.stock).to.be.a('number')
        expect(res.body.published).to.be.a('string')
        expect(res.body.writer).to.be.a('string')
        expect(res.body.penciler).to.be.a('string')
        expect(res.body.createdAt).to.be.a('string')
        expect(res.body.updatedAt).to.be.a('string')
        expect(res.body.image).to.be.a('string')

        done()
      })
    })
    it('should return unauthorized error message if user is a customer', function (done) {
      let body = {
        name: 'Runaways (2017) #27',
        description: 'JUSTICE IS SERVED! The Runaways can’t go home, but Los Angeles’ First Protector and Most Venerable Hero has taken them in! Have they FINALLY met a powerful adult they can trust? To fight by his side, they’ll have to leave one of their own behind! And without a soul to feast on, Gib is fading fast. Sounds like a ticking clock…',
        published: '2019-11-13',
        price: 3.99,
        stock: 5,
        writer: 'Rainbow Rowell',
        penciler: 'Andres Genolet'
      }

      chai.request(app)
      .post('/products')
      .type('form')
      .attach('image', fs.readFileSync('./futurefoundation4.jpg'), './futurefoundation4.jpg')
      .field('name', body.name)
      .field('description', body.description)
      .field('published', body.published)
      .field('price', body.price)
      .field('stock', body.stock)
      .field('writer', body.writer)
      .field('penciler', body.penciler)
      .set('access_token', customerToken)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(403)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('messages')

        expect(res.body.messages).to.include('You are not authorized to access this data')

        done()
      })
    })
    it('should return error messages when name, price and stock is empty', function (done) {
      let body = {
        name: '',
        description: 'JUSTICE IS SERVED! The Runaways can’t go home, but Los Angeles’ First Protector and Most Venerable Hero has taken them in! Have they FINALLY met a powerful adult they can trust? To fight by his side, they’ll have to leave one of their own behind! And without a soul to feast on, Gib is fading fast. Sounds like a ticking clock…',
        published: '2019-11-13',
        price: '',
        stock: '',
        writer: 'Rainbow Rowell',
        penciler: 'Andres Genolet'
      }

      chai.request(app)
      .post('/products')
      .type('form')
      .attach('image', fs.readFileSync('./futurefoundation4.jpg'), './futurefoundation4.jpg')
      .field('name', body.name)
      .field('description', body.description)
      .field('published', body.published)
      .field('price', body.price)
      .field('stock', body.stock)
      .field('writer', body.writer)
      .field('penciler', body.penciler)
      .set('access_token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('messages')

        expect(res.body.messages).to.include('Product name cannot be empty')
        expect(res.body.messages).to.include('Price cannot be empty')
        expect(res.body.messages).to.include('Product stock cannot be empty')

        done()
      })
    })
    it('should return error messages when price and stock is invalid', function (done) {
      let body = {
        name: 'Runaways (2017) #27',
        description: 'JUSTICE IS SERVED! The Runaways can’t go home, but Los Angeles’ First Protector and Most Venerable Hero has taken them in! Have they FINALLY met a powerful adult they can trust? To fight by his side, they’ll have to leave one of their own behind! And without a soul to feast on, Gib is fading fast. Sounds like a ticking clock…',
        published: '2019-11-13',
        price: 0,
        stock: -1,
        writer: 'Rainbow Rowell',
        penciler: 'Andres Genolet'
      }

      chai.request(app)
      .post('/products')
      .type('form')
      .attach('image', fs.readFileSync('./futurefoundation4.jpg'), './futurefoundation4.jpg')
      .field('name', body.name)
      .field('description', body.description)
      .field('published', body.published)
      .field('price', body.price)
      .field('stock', body.stock)
      .field('writer', body.writer)
      .field('penciler', body.penciler)
      .set('access_token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('messages')

        expect(res.body.messages).to.include('Price cannot be zero or less')
        expect(res.body.messages).to.include('Product stock cannot be zero or less')

        done()
      })
    })
  })
  describe('get product', function () {
    it('should return array of products', function (done) {
      chai.request(app)
      .get('/products')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(200)
        expect(res.body).to.be.an('array')
        expect(res.body[0]).to.have.all.keys('_id', 'name', 'description', 'price', 'stock', 'writer', 'penciler', 'updatedAt', 'createdAt', 'published', 'image')
        productId = res.body[0]._id
        done()
      })
    })
  })
  describe('update product', function () {
    it('should return _id, name, description, price, stock, published, writer, penciler, createdAt, updatetAd when input is complete and valid', function (done) {
      let body = {
        name: 'Runaways (2018) #37',
        description: 'JUSTICE IS SERVED! The Runaways can’t go home, but Los Angeles’ First Protector and Most Venerable Hero has taken them in! Have they FINALLY met a powerful adult they can trust? To fight by his side, they’ll have to leave one of their own behind! And without a soul to feast on, Gib is fading fast. Sounds like a ticking clock…',
        published: '2019-11-13',
        price: 4.99,
        stock: 10,
        writer: 'Rainbow Rowell',
        penciler: 'Andres Genolet'
      }

      chai.request(app)
      .patch(`/products/${productId}`)
      .send(body)
      .set('access_token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('_id', 'name', 'description', 'price', 'stock', 'published', 'writer', 'penciler', 'createdAt', 'updatedAt', 'image')

        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.description).to.be.a('string')
        expect(res.body.price).to.be.a('number')
        expect(res.body.stock).to.be.a('number')
        expect(res.body.published).to.be.a('string')
        expect(res.body.writer).to.be.a('string')
        expect(res.body.penciler).to.be.a('string')
        expect(res.body.createdAt).to.be.a('string')
        expect(res.body.updatedAt).to.be.a('string')
        expect(res.body.image).to.be.a('string')

        expect(res.body.name).equals('Runaways (2018) #37')

        done()
      })
    })
    it('should return error messages when price and stock is invalid', function (done) {
      let body = {
        name: 'Runaways (2017) #27',
        description: 'JUSTICE IS SERVED! The Runaways can’t go home, but Los Angeles’ First Protector and Most Venerable Hero has taken them in! Have they FINALLY met a powerful adult they can trust? To fight by his side, they’ll have to leave one of their own behind! And without a soul to feast on, Gib is fading fast. Sounds like a ticking clock…',
        published: '2019-11-13',
        price: 0,
        stock: -1,
        writer: 'Rainbow Rowell',
        penciler: 'Andres Genolet'
      }

      chai.request(app)
      .patch(`/products/${productId}`)
      .send(body)
      .set('access_token', adminToken)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(400)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('messages')

        expect(res.body.messages).to.include('Price cannot be zero or less')
        expect(res.body.messages).to.include('Product stock cannot be zero or less')

        done()
      })
    })
  })
})
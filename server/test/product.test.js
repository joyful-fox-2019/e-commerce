const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp)
const Product = require('../models/Product')

describe('Product Test', function () {
  after(function (done) {
    Product.deleteMany({})
      .then(_ => {
        done()
      })
      .catch(console.log)
  })
  describe('create', function () {
    it('should return _id, name, description, price, stock, published, writer, penciler, createdAt, updatetAd when input is complete and valid', function (done) {
      let body = {
        name: 'Runaways (2017) #27',
        description: 'JUSTICE IS SERVED! The Runaways can’t go home, but Los Angeles’ First Protector and Most Venerable Hero has taken them in! Have they FINALLY met a powerful adult they can trust? To fight by his side, they’ll have to leave one of their own behind! And without a soul to feast on, Gib is fading fast. Sounds like a ticking clock…',
        published: new Date('2019-11-13'),
        price: 3.99,
        stock: 5,
        writer: 'Rainbow Rowell',
        penciler: 'Andres Genolet'
      }

      chai.request(app)
      .post('/products')
      .send(body)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('_id', 'name', 'description', 'price', 'stock', 'published', 'writer', 'penciler', 'createdAt', 'updatedAt')

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

        done()
      })
    })
    it('should return error messages when name, price and stock is empty', function (done) {
      let body = {
        name: '',
        description: 'JUSTICE IS SERVED! The Runaways can’t go home, but Los Angeles’ First Protector and Most Venerable Hero has taken them in! Have they FINALLY met a powerful adult they can trust? To fight by his side, they’ll have to leave one of their own behind! And without a soul to feast on, Gib is fading fast. Sounds like a ticking clock…',
        published: new Date('2019-11-13'),
        price: '',
        stock: '',
        writer: 'Rainbow Rowell',
        penciler: 'Andres Genolet'
      }

      chai.request(app)
      .post('/products')
      .send(body)
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
        published: new Date('2019-11-13'),
        price: 0,
        stock: -1,
        writer: 'Rainbow Rowell',
        penciler: 'Andres Genolet'
      }

      chai.request(app)
      .post('/products')
      .send(body)
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
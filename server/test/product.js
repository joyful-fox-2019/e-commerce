const app = require('../app')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const db = require('../models/product')
const dbUser = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const fs = require('fs')

chai.use(chaiHttp)

let admin
let idProduct
let dataCategory

describe('Product', function () {
  before(function (done) {
    this.timeout(6000)
    let dataAdm = {
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'password',
      role: 'admin'
    }

    dbUser.create(dataAdm)
      .then(user => {
        let token = generateToken({ id: user._id })
        admin = { token }
        done()
      })
      .catch(err => {
        console.log(err);
      })
  })

  after(() => {
    db.collection.deleteMany({})
    dbUser.collection.deleteMany({})
  })

  describe('add-product', function () {
    // Sucess add product
    it(`Should added new product without error with status 201`, function (done) {
      chai.request(app)
        .post('/product/add')
        .set(admin, admin)
        .field('name', 'Kulkas')
        .field('category', 'Perabot')
        .field('description', 'Kulkas 2 pintu')
        .field('price', 100000)
        .field('stock', 10)
        .attach('image', fs.readFileSync('./test/img/no-img.jpg'), 'no-img.jpg')
        .end((err, res) => {
          idProduct = res.body._id
          dataCategory = res.body.category[0]
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.all.keys(
            "_id", "name", "category", "description", "price", "stock", "imgUrl"
          )
          expect(res.body.name).to.be.equal('Kulkas')
          expect(res.body.category).to.be.include('Perabot')
          expect(res.body.description).to.be.equal('Kulkas 2 pintu')
          expect(res.body.price).to.be.equal(100000)
          expect(res.body.stock).to.be.equal(10)
          done()
        })
    })

    // error: Not Authentication (not set headers)
    it(`Should error with status 400 and message You are not authentication`, function (done) {
      chai.request(app)
        .post('/product/add')
        .field('name', 'Lemari')
        .field('category', 'Perabot')
        .field('description', 'Kulkas 2 pintu')
        .field('price', 100000)
        .field('stock', 10)
        .attach('image', fs.readFileSync('./test/img/no-img.jpg'), 'no-img.jpg')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.include('You are not authentication!')
          done()
        })
    })

    // error: required Field
    it(`Should error with status 400 and message error required field`, function (done) {
      chai.request(app)
        .post('/product/add')
        .set(admin, admin)
        .attach('image', fs.readFileSync('./test/img/no-img.jpg'), 'no-img.jpg')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('array').that.includes(`Product name is required!`, `Category is required!`, `Category is required!`, `Description is required!`, `Price is required!`, `Stock is required!`)
          done()
        })
    })
  })

  describe('get all product', function () {
    // Sucess get all product
    it(`Should succes get all product with status 200 and will get array of object product`, function (done) {
      chai.request(app)
        .get('/product')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.be.an('object').that.have.all.keys(
            "_id", "name", "category", "description", "price", "stock", "imgUrl"
          )
          done()
        })
    })
  })

  describe('get product by id', function () {
    // Success get data product by idProduct
    it(`Should success get data product with status 200`, function (done) {
      chai.request(app)
        .get(`/product/${idProduct}`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body).to.be.an('object').that.have.all.keys(
            "_id", "name", "category", "description", "price", "stock", "imgUrl"
          )
          done()
        })
    })
  })

  describe('Search product by category', function () {
    // Success
    it(`Should success get all data products filter by category with status 200`, function (done) {
      chai.request(app)
        .get('/product/search')
        .query({ category: dataCategory })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.have.all.keys(
            "_id", "name", "category", "description", "price", "stock", "imgUrl"
          )
          done()
        })
    })
  })

  describe('edit product that allowed field', function () {
    // Error edit product (Not authentication)
    it(`Should error update product with status 400 and get message You are not authentication`, function (done) {
      let body = {
        name: 'Update Kulkas',
        category: 'Update Perabot',
        description: 'Update Kulkas 2 pintu',
        price: 20000,
        stock: 5
      }
      chai.request(app)
        .patch(`/product/${idProduct}/edit`)
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.include('You are not authentication!')
          done()
        })
    })

    // Success edit field => name, category, description, stock
    it(`Should success update product with status 200 and user will get updated data product`, function (done) {
      let body = {
        name: 'Update Kulkas',
        category: 'Update Perabot',
        description: 'Update Kulkas 2 pintu',
        price: 20000,
        stock: 5
      }
      chai.request(app)
        .patch(`/product/${idProduct}/edit`)
        .set(admin, admin)
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.all.keys(
            "_id", "name", "category", "description", "price", "stock", "imgUrl"
          )
          expect(res.body.name).to.be.equal('Update Kulkas')
          expect(res.body.category).to.be.include('Update Perabot')
          expect(res.body.description).to.be.equal('Update Kulkas 2 pintu')
          expect(res.body.price).to.be.equal(20000)
          expect(res.body.stock).to.be.equal(5)
          done()
        })
    })
  })

  describe('Delete Product', function () {
    // error: Not set headers (not authentication / authorization)
    it(`Should error delete product with status 401 and message You are not authentication`, function (done) {
      chai.request(app)
        .delete(`/product/${idProduct}/delete`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.include('You are not authentication!')
          done()
        })
    })

    // Success delete product
    it('Should succes delete product with status 200 and message Deleted product success!', function (done) {
      chai.request(app)
        .delete(`/product/${idProduct}/delete`)
        .set(admin, admin)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.equal('Deleted product success!')
          done()
        })
    })
  })
})
// }, 5000);
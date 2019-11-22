const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const app = require('../app')
const fs = require('fs')
const gcsdelete = require('../helpers/gcsdelete')
const Product = require('../models/product')
const User = require('../models/user')

chai.use(chaiHTTP)

const img = fs.readFileSync('./test/asset/test1.jpg')

let adminToken = null
let nonAdminToken = null
let idProduct

describe('Product Router', function(){
  before(function (done) {
    this.timeout(6000)
    const adminData = {
      username: "akbar",
      email: "akbar@gmail.com",
      password: "akbar",
      role: "admin"
    }
    const nonAdminData = {
      username: "fitra",
      email: "fitra@gmail.com",
      password: "fitra"
    }
  
    const tokens = () => {
      return new Promise((resolve, reject) => {
        chai.request(app)
          .post('/user/register/admin')
          .send(adminData)
          .end(function (err, res) {
            if (err) return reject(err)
            
            adminToken = res.body.token
            
            chai.request(app)
              .post('/user/register')
              .send(nonAdminData)
              .end(function (err, res) {
                if (err) return reject(err)
                nonAdminToken = res.body.token
                resolve()
              })
          })
      })
    }
    Promise.all([tokens()])
      .then(() => done())
      .catch(err => {
          console.error(err)
          return Promise.all([Product.deleteMany({}), User.deleteMany({})])
      })
      // .then(() => done())
      // .catch(console.error)
  })
  
  
  after(function (done) {
    this.timeout(6000)
    Promise.all([Product.deleteMany({}), User.deleteMany({})])
        .then(() => {done(), console.log(':Testing User Database Deleted')})
        .catch(console.log)
  })
  
  let url = null
    afterEach(function () {
      if (url) {
        gcsdelete(url)
        url = null
      }
      return
    })
  describe('Create Product', function(){
    it('Success Create Product', function(done){
      this.timeout(3000)
      const data = {
        name: 'Steam Voucher',
        price: 20000,
        stock: 30
      }
      chai.request(app)
        .post('/product')
        .type('form-data')
        .set({ accesstoken: adminToken })
        .field('name', 'Steam Voucher')
        .field('price', '20000')
        .field('stock', '30')
        .attach('img', img, 'test1.jpg')
        .end(function(err, res){
          idProduct = res.body._id
          url = res.body.img
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('_id', 'name', 'price', 'stock', 'img', 'createdAt', 'updatedAt')
          const { name, price, stock } = res.body
          expect(name).to.equal(data.name)
          expect(price).to.equal(data.price)
          expect(stock).to.equal(data.stock)
          done()
        })
    })
    it('Error Create Product Non Admin', function(done){
      this.timeout(3000)
      chai.request(app)
        .post('/product')
        .type('form-data')
        .set({ accesstoken: nonAdminToken })
        .field('name', 'Steam Voucher')
        .field('price', '20000')
        .field('stock', '30')
        .attach('img', img, 'test1.jpg')
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { code, message } = res.body
          expect(code).to.equal(res.status)
          expect(message).to.be.a('string')
          expect(message).to.equal('Dont Have Authorization!')
          done()
        })
    })
    it('Error Create Product Not Set Token', function(done){
      this.timeout(3000)
      chai.request(app)
        .post('/product')
        .type('form-data')
        .field('name', 'Steam Voucher')
        .field('price', '20000')
        .field('stock', '30')
        .attach('img', img, 'test1.jpg')
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { code, message } = res.body
          expect(code).to.equal(res.status)
          expect(message).to.be.a('string')
          expect(message).to.equal('You are not logged in or your session expired. Please relogin')
          done()
        })
    })
    it('Error Create Product key Not Filled', function(done){
      this.timeout(3000)
      chai.request(app)
        .post('/product')
        .type('form-data')
        .set({ accesstoken: adminToken })
        .attach('img', img, 'test1.jpg')
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.an('array').to.be.includes('Product Must Have a Name', 'Product Must Have a Stock', 'Product Must Have a Price')
          done()
        })
    })
  })

  describe('Get Data Product', function(){
    this.timeout(3000)
    it('Success Get All Product', function(done){
      chai.request(app)
        .get('/product')
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.be.an('object').that.all.have.keys('_id', 'name', 'stock', 'price', 'img', 'createdAt', 'updatedAt')
          done()
        })
    })
  })
  
  describe('Update Data Product', function(){
    it('Success update product', function (done) {
      this.timeout(3000)
      chai.request(app)
        .put('/product/' + idProduct)
        .set({ accesstoken: adminToken })
        .field('name', 'Voucher Steam Obral')
        .field('price', 10000)
        .field('stock', 10)
        .attach('img', img, 'test1.jpg')
        .end(function (err, res) {
          imageurl = res.body.image
          expect(err).to.be.null;
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('name', 'price', 'stock', 'img', 'createdAt', 'updatedAt', '_id')
          done()
        })
    })
    it('Error update product - Non Admin', function (done) {
      this.timeout(3000)
      
      chai.request(app)
        .put('/product/' + idProduct)
        .set({ accesstoken: nonAdminToken })
        .field('name', 'Voucher Steam Obral')
        .field('price', 10000)
        .field('stock', 10)
        .attach('img', img, 'test1.jpg')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { code, message } = res.body
          expect(code).to.equal(res.status)
          expect(message).to.be.a('string')
          expect(message).to.equal('Dont Have Authorization!')
          done()
        })
    })
    it('Error update product - Not Set Token', function (done) {
      this.timeout(3000)
      
      chai.request(app)
        .put('/product/' + idProduct)
        .field('name', 'Voucher Steam Obral')
        .field('price', 10000)
        .field('stock', 10)
        .attach('img', img, 'test1.jpg')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { code, message } = res.body
          expect(code).to.equal(res.status)
          expect(message).to.be.a('string')
          expect(message).to.equal('You are not logged in or your session expired. Please relogin')
          done()
        })
    })

  })
  describe('Delete product', function () {
    it('Success Delete Product', function (done) {
      this.timeout(3000)
      chai.request(app)
        .delete('/product/' + idProduct)
        .set({ accesstoken: adminToken })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          const { message } = res.body
          expect(message).to.be.a('string')
          expect(message).to.equal('Product was Deleted')
          done()
        })
    })
    it('Success Delete Product - Not Admin', function (done) {
      this.timeout(3000)
      chai.request(app)
        .delete('/product/' + idProduct)
        .set({ accesstoken: nonAdminToken })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { code, message } = res.body
          expect(code).to.equal(res.status)
          expect(message).to.be.a('string')
          expect(message).to.equal('Dont Have Authorization!')
          done()
        })
    })
    it('Error Delete product - Not Set Token', function (done) {
      this.timeout(3000)
      chai.request(app)
        .delete('/product/' + idProduct)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { code, message } = res.body
          expect(code).to.equal(res.status)
          expect(message).to.be.a('string')
          expect(message).to.equal('You are not logged in or your session expired. Please relogin')
          done()
        })
    })
  })

  

})
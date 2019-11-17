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
let idCart

let productId1
let image1
let productId2
let image2

describe('Cart Router', function(done){
  before(function (done) {
    this.timeout(5000)
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
  
    function createAdmin() {
      return new Promise((resolve, reject) => {
        chai.request(app)
          .post('/user/register/admin')
          .send(adminData)
          .end(function (err, res) {
            if (err) return reject(err)
            adminToken = res.body.token
            resolve()
          })
      })
    }
  
    function getUsertoken() {
      return new Promise((resolve, reject) => {
        chai.request(app)
          .post('/user/register')
          .send(nonAdminData)
          .end(function (err, res) {
            if (err) return reject(err)
            nonAdminToken = res.body.token
            resolve()
          })
      })
    }
  
    function product1() {
      return new Promise((resolve, reject) => {
        chai.request(app)
          .post('/product')
          .type('form')
          .set({ accesstoken: adminToken })
          .field('name', 'Steam Voucher 1')
          .field('price', '20000')
          .field('stock', '30')
          .attach('img', img, 'test1.jpg')
          .end(function (err, res) {
            if (err) return reject(err)
            productId1 = res.body._id
            image1 = res.body.img
            resolve()
          })
      })
    }
    function product2() {
      return new Promise((resolve, reject) => {
        chai.request(app)
          .post('/product')
          .type('form')
          .set({ accesstoken: adminToken })
          .field('name', 'Steam Voucher 2')
          .field('price', '20000')
          .field('stock', '0')
          .attach('img', img, 'test1.jpg')
          .end(function (err, res) {
            if (err) return reject(err)
            productId2 = res.body._id
            image2 = res.body.img
            resolve()
          })
      })
    }
    Promise.all([getUsertoken(), createAdmin()])
    .then(() => Promise.all([product1(), product2()])
    )
    .then(() => done())
    .catch(err => {
        console.error(err)
        return Promise.all([Product.deleteMany({}), User.deleteMany({})])
    })
    .then(() => { })
    .catch(console.error)
  })
  
  after(function (done) {
    this.timeout(5000)
    gcsdelete(image1)
    gcsdelete(image2)
    
    Promise.all([Product.deleteMany({}), User.deleteMany({})])
        .then(() => done())
        .catch(console.error)
  })
  describe('Create Cart', function(){
    it('Success Create Cart', function(done){
      this.timeout(5000)
      const data = {
        quantity: 1,
      }
      chai.request(app)
        .post(`/cart/${productId1}`)
        .send(data)
        .set({ accesstoken: nonAdminToken })
        .end(function(err, res){
          idCart = res.body._id
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('_id', 'product', 'quantity', 'owner','createdAt', 'updatedAt')
          const { _id, product, quantity } = res.body
          expect(product).to.equal(productId1)
          expect(quantity).to.equal(data.quantity)
          done()
        })
    })
    it('Error Create Cart with Quantity Less Than 1', function(done){
      this.timeout(5000)
      const data = {
        quantity: 0,
      }
      chai.request(app)
        .post(`/cart/${productId1}`)
        .send(data)
        .set({ accesstoken: nonAdminToken })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { message } = res.body
          expect(message).to.equal('Amount Dont Lower Than 1')
          done()
        })
    })
    it('Error Create Cart with Quantity Greater Than product Stock', function(done){
      this.timeout(5000)
      const data = {
        quantity: 99999,
      }
      chai.request(app)
        .post(`/cart/${productId1}`)
        .send(data)
        .set({ accesstoken: nonAdminToken })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { message } = res.body
          expect(message).to.equal('Your Amount Greather Than Product Stock')
          done()
        })
    })
    it('Error Create Cart with product stock empty', function(done){
      this.timeout(5000)
      const data = {
        quantity: 10,
      }
      chai.request(app)
        .post(`/cart/${productId2}`)
        .send(data)
        .set({ accesstoken: nonAdminToken })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { message } = res.body
          expect(message).to.equal('Stock is Empty')
          done()
        })
    })
    it('Error Create Cart without login', function(done){
      this.timeout(5000)
      const data = {
        quantity: 10,
      }
      chai.request(app)
        .post(`/cart/${productId1}`)
        .send(data)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { message } = res.body
          expect(message).to.equal('You are not logged in or your session expired. Please relogin')
          done()
        })
    })
  })
  describe('Get User Cart', function(){
    it('Success Get All Cart', function(done){
      this.timeout(5000)
      chai.request(app)
        .get('/cart')
        .set({ accesstoken: nonAdminToken })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.be.an('object').that.all.have.keys('product', 'owner', 'quantity', '_id', 'createdAt', 'updatedAt')
          done()
        })
    })
    it('Error Get All Cart without Login', function(done){
      this.timeout(5000)
      chai.request(app)
        .get('/cart')
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { message } = res.body
          expect(message).to.equal('You are not logged in or your session expired. Please relogin')
          done()
        })
    })
  })
  describe('Remove item Cart', function(){
    it('Success Remove item Cart', function (done) {
      this.timeout(5000)
      chai.request(app)
        .delete('/cart/'+ idCart)
        .set({ accesstoken: nonAdminToken })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          const { message } = res.body
          expect(message).to.be.a('string')
          expect(message).to.equal('Cart Item was Deleted')
          done()
        })
    })
    it('Error Get All Cart without Login', function(done){
      this.timeout(5000)
      chai.request(app)
        .get('/cart/'+ idCart)
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { message } = res.body
          expect(message).to.equal('You are not logged in or your session expired. Please relogin')
          done()
        })
    })
    it('Error Get All Cart Not User', function(done){
      this.timeout(5000)
      chai.request(app)
        .get('/cart/'+ idCart)
        .set({ accesstoken: adminToken })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'message')
          const { message } = res.body
          expect(message).to.equal('Not Your Account')
          done()
        })
    })
  })
})
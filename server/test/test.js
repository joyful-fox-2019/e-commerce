const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
let mongoose = require("mongoose");
let User = require('../models/user')
const expect = chai.expect
let Product = require('../models/product')
let should = chai.should()


chai.use(chaiHttp)

before(function() {
    const data = {
      username: 'owl',
      email: 'owl@mail.com',
      password: 'kitabong'
    }
    User.create(data)
      .then(user => console.log('testing: Success'))
      .catch(console.log)
  })

  after(function(done) {
      User.deleteMany({})
        .then(_ => {
          console.log('testing: user data deleted')
          done()
        })
        .catch(console.log)
  })


//Users
describe('Users', () => {
    let tokenUser = null;
    
    describe('/GET, User', () => {
        it('Should return all users', function (done) {
            chai.request(app)
            .get('/users')
            .end(function (err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('array')
                done();
            })
        })
    })

    describe('/POST, USER-LOGIN', () => {
        it('Should return token', function (done) {
            chai.request(app)
            .post('/users/login')
            .send({
                username: 'owl',
                password: 'kitabong'
            })
            .end(function (err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(202)
                expect(res.body).to.be.a('object')
                tokenUser = res.body.token
                console.log(tokenUser)
                done()
            })   
        })
    })

    describe('/POST User', () => {
        it('Should return single user', function (done) {
            let user = {
                username: 'laskarks',
                email: 'laskar@mail.com',
                password: 'kitabong'
            }
            chai.request(app)
            .post('/users')
            .send(user)
            .end(function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                done()
            })
        })
    })

    describe('/users/topups', () => {
        it('Must be return message success topup', function (done) {
            let topUp = '10000'
            chai.request(app)
            .patch('/users/topups')
            .set({token: tokenUser})
            .send(topUp)
            .end(function (err,res) {
                console.log(res.body, '-----------------------')
                expect(err).to.be.null
                expect(res).to.have.status(202)
                expect(res.body).to.be.an('object')
                done()
            })

        })
    })


})//////////////////////////////////////////////////////////////////

//Products ----------------------->
describe('Products',function () {

    let productId = null

    beforeEach(function (done) {
       Product.create({
           productName: 'Prototype I',
            description: 'This is Prototype I',
            category: 'electric',
            amount: 2   
       })
       .then(_ => {
           done()
       })
       .catch((err)=> {
           done()
       }) 
    })

    afterEach(function (done) {
        Product.deleteMany({})
            .then(_ => {
                console.log('Product: Deleted Success')
                done()
            })
            .catch((err)=> {
                done()
            })
    })

    describe('/GET ALL PRODUCT', function() {
        it('It should be GET all products', (done) => {
            chai.request(app)
            .get('/products')
            .end((err,res)=> {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('array')
                expect(err).to.be.null
                done()
            })
        })
    })

    describe('/POST NEW PRODUCT',function() {
        const product = {
            productName: 'Sepatu Adidas',
            description: 'Sepatu adidas asli buatan jerman',
            price: 100,
            amount: 5
        }
        it('It Should be return Object New Product', (done) => {
            chai.request(app)
            .post('/products')
            .send(product)
            .end((err,res)=> {
                // console.log(res.body,'--------------------------------------------->')
                productId = res.body.id
                console.log(res.body)
                expect(res.body).to.be.a('object')
                expect(err).to.be.null
                done()
            })
        })
    })

    describe('/DELETE PRODUCT', function () {
        it('It should be success delete Product',(done) => {
            chai.request(app)
            .delete(`/products/${productId}`)
            .end((err,res) => {
                expect(res).to.have.status(202)
                expect(err).to.be.null
                done()
            })
        })
    })

    // describe ()

})

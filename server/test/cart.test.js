const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const { Item, User, Cart } = require('../models')
let tokenAdmin, tokenCustomer, cartId, itemId, customerId, adminId
const { generateToken } = require('../helpers/jwt')
const falseId = '5d63b24530a316a809302c57'
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const { readFileSync } = require('fs')

chai.use(chaiHttp)
const expect = chai.expect
const file = readFileSync('./test/test.jpeg')

after(function(done) {
    if (process.env.NODE_ENV === 'testing') {
        Item.deleteMany()
            .then(_ => {
                console.log('testing: delete data item succes!')
                return User.deleteMany()
            })
            .then(_ => {
                console.log('testing: delete data user success!')
                return Cart.deleteMany()
            })
            .then(_ => {
                console.log('testing: delete data cart success!')
            })
            .catch(console.log)
            .finally(() => {
                done()
            })
    } 
})

before(function(done) {
    User.create({
        name: 'admin',
        email: 'admin@admin.com',
        password: '12345678',
        role: 'admin'
    })
        .then((user) => {
            let payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
                }
            adminId = user._id
            tokenAdmin = generateToken(payload)
            return User.create({
                name: 'buyer',
                email: 'buyer@buyer.com',
                password: '12345678',
                role: 'customer'
            })
        })
        .then((user) => {
            let payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
                }
            customerId = user._id
            tokenCustomer = generateToken(payload)
            return Item.create({
                name: 'tea',
                description: 'green tea',
                image: 'url', 
                price: 5000,
                stock: 100
            })
        })
        .then((item) => {
            itemId = item._id
            done()
        })
        .catch(console.log)
})

describe('Cart CRUD', function() {
    this.timeout(10000)
    describe('POST /carts/id', function() {
        describe('succes process', function() {
            it('should send an object (newCart, message) with 201 status code', function(done) {
                console.log(itemId, '===================')
                chai.request(app)
                .post(`/click/carts/${itemId}`)
                .set('token', tokenCustomer)
                .send({
                    qty: 7,
                    status: true,
                })
                .end(function(err, res) {
                    console.log('==================')
                    console.log(res.body)
                    console.log('==================')

                    cartId = res.body.newCart._id
                    itemId = res.body.newCart.itemId
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('newCart','message')
                    expect(res.body.message).to.equal('succes add product to cart')
                    done()
                })
            })
            it('should send an object (newCart, message) with 201 status code', function(done) {
                chai.request(app)
                .post(`/click/carts/${itemId}`)
                .set('token', tokenCustomer)
                .send({
                    qty: 4,
                    status: false,
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('newCart','message')
                    expect(res.body.message).to.equal('succes add product to cart')
                    done()
                })
            })
            it('should send an object (newCart, message) with 201 status code', function(done) {
                chai.request(app)
                .post(`/click/carts/${itemId}`)
                .set('token', tokenAdmin)
                .send({
                    qty: 4
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('newCart','message')
                    expect(res.body.message).to.equal('succes add product to cart')
                    done()
                })
            })
        })
        describe('errors process', function() {
            it('should send an error response with status code 400 because ivalid itemId', function(done) {
                chai.request(app)
                .post(`/click/carts/${falseId}`)
                .set('token', tokenCustomer)
                .send({
                    qty: 4
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.error).to.be.an('array').that.includes('data not found')
                    done()
                })
            })
            it('should send an error response with status code 400 because qty more than stock', function(done) {
                chai.request(app)
                .post(`/click/carts/${itemId}`)
                .set('token', tokenCustomer)
                .send({
                    qty: 1000
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.error).to.be.an('array').that.includes('stock less than qty')
                    done()
                })
            })
        }) 
    })
    describe('GET /carts', function() {
        describe('succes process', function() {
            it('should send an object (carts) with 200 status code', function(done) {
                chai.request(app)
                .get(`/click/carts`)
                .set('token', tokenAdmin)
                .end(function(err, res) {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('carts')
                    done()
                })
            })
        })
        describe('errors process', function() { 
            it('should send an error response with status code 400 because customer not authorized', function(done) {
                chai.request(app)
                .get(`/click/carts`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.error).to.be.an('array').that.includes('restricted admin only')
                    done()
                })
            })
            it('should send an error response with status code 400 because invalid token', function(done) {
                chai.request(app)
                .get(`/click/carts`)
                .set('token', invalidToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.error).to.be.an('array').that.includes('login first')
                    done()
                })
            })
        })
    })
    describe('GET /carts/user', function() {
        describe('succes process', function() {
            it('should send an object (carts) with 200 status code', function(done) {
                chai.request(app)
                .get(`/click/carts/user`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('carts')
                    done()
                })
            })
        })
        describe('errors process', function() { 
            it('should send an error response with status code 400 because invalid token', function(done) {
                chai.request(app)
                .get(`/click/carts/user`)
                .set('token', invalidToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.error).to.be.an('array').that.includes('login first')
                    done()
                })
            })
        })
    })
    describe('GET /carts/user/history', function() {
        describe('succes process', function() {
            it('should send an object (carts) with 200 status code', function(done) {
                chai.request(app)
                .get(`/click/carts/user/history`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('carts')
                    done()
                })
            })
        })
        describe('errors process', function() { 
            it('should send an error response with status code 400 because invalid token', function(done) {
                chai.request(app)
                .get(`/click/carts/user/history`)
                .set('token', invalidToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.error).to.be.an('array').that.includes('login first')
                    done()
                })
            })
        })
    })
    describe('GET /carts/user/pending', function() {
        describe('succes process', function() {
            it('should send an object (carts) with 200 status code', function(done) {
                chai.request(app)
                .get(`/click/carts/user/pending`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('carts')
                    done()
                })
            })
        })
        describe('errors process', function() { 
            it('should send an error response with status code 400 because invalid token', function(done) {
                chai.request(app)
                .get(`/click/carts/user/pending`)
                .set('token', invalidToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.error).to.be.an('array').that.includes('login first')
                    done()
                })
            })
        })
    })
    describe('PUT /carts/:id', function() {
        describe('succes process', function() {
            it('should send an object (cart, message) with 200 status code', function(done) {
                chai.request(app)
                .put(`/click/carts/${cartId}`)
                .set('token', tokenCustomer)
                .send({
                    status: true
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('checkout success')
                    done()
                })
            })
            it('should send an object (carts) with 200 status code', function(done) {
                chai.request(app)
                .put(`/click/carts/${cartId}`)
                .set('token', tokenCustomer)
                .send({
                    qty: 1
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('success update cart')
                    done()
                })
            })
        })
        describe('errors process', function() { 
            it('should send an error response with status code 400 because invalid token', function(done) {
                chai.request(app)
                .put(`/click/carts/${cartId}`)
                .set('token', invalidToken)
                .send({
                    status: false,
                    qty: 2
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.error).to.be.an('array').that.includes('login first')
                    done()
                })
            })
            it('should send an error response with status code 400 because invalid cartId', function(done) {
                chai.request(app)
                .put(`/click/carts/${falseId}`)
                .set('token', tokenCustomer)
                .send({
                    status: false,
                    qty: 2
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
            it('should send an error response with status code 400 because stock less than qty', function(done) {
                chai.request(app)
                .put(`/click/carts/${cartId}`)
                .set('token', tokenCustomer)
                .send({
                    status: false,
                    qty: 10001
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.error).to.be.an('array').that.includes('stock less than qty')
                    done()
                })
            })
        })
    })
    describe('DELETE /carts/:id', function() {
        describe('succes process', function() {
            it('should send an object (cart, message) with 200 status code', function(done) {
                chai.request(app)
                .delete(`/click/carts/${cartId}`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('cart', 'message')
                    expect(res.body.message).to.equal('success delete cart')
                    done()
                })
            })
        })
        describe('errors process', function() { 
            it('should send an error response with status code 400 because invalid token', function(done) {
                chai.request(app)
                .delete(`/click/carts/${cartId}`)
                .set('token', invalidToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.error).to.be.an('array').that.includes('login first')
                    done()
                })
            })
            it('should send an error response with status code 400 because invalid cartId', function(done) {
                chai.request(app)
                .delete(`/click/carts/${falseId}`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
    })
})

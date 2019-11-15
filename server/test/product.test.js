const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const fs = require('fs')
const User = require('../models/user')
const Product = require('../models/product')

chai.use(chaiHttp)
const expect = chai.expect

let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2E5MjAzYjlhYTc4MjEwN2NiZDMxNiIsInVzZXJuYW1lIjoiYWRtaW41IiwiZW1haWwiOiJhZG1pbjVAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzM1NTY3Mzl9.jKN-FhrDFE-ITV_aYEzdmX7-rfRmuCyy_uOTrE_8OCE"
let customerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2E2ZjI3YWVjYWM3MWFmZDEyYmE0YiIsInVzZXJuYW1lIjoiY3VzdG9tZXIyIiwiZW1haWwiOiJjdXN0b21lcjJAbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1NzM1NDc4MTV9.1yKfyxp39WQBd76Ufln7jCEbUbFFopY9r3r-_gxML6E"
// let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2E2ZjI3YWVjYWM3MWFmZDEyYmE0YiIsInVzZXJuYW1lIjoiY3VzdG9tZXIyIiwiZW1haWwiOiJjdXN0b21lcjJAbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1NzM1NDc4MTV9.1yKfyxp39WQBd76Ufln7jCEbUbFFopY9r3r-_gxML7F"

// let admin = {
//     username: 'admin5',
//     email: "admin5@mail.com",
//     password: 'admin',
//     role: 'admin'
// }
let productData = {
    name: "pokemon shield",
    price: "650000",
    stock: "11"
}

let updateProductData = {
    name: "pokemon saphhire",
    price: "1000000",
    stock: "1"
}

// before('register user as admin', function(done) {
//     chai.request(app)
//     .post('/users/register')
//     .send(admin)
//     .end(function(err, res) {
//         if(err) {
//             done(err)
//         } else {
//             token = res.body.token
//             console.log(res.body);
//             done()
//         }
//     })
// })

// after(function(done) {
//     if(process.env.NODE_ENV === 'testing') {
//         Product.deleteMany({})
//             .then(() => {
//                 console.log(`testing: success delete product data`)
//                 done()
//             })
//             .catch(console.log)
//     }
// })

describe('CRUD Products Endpoints', function() {
    this.timeout(10000)
    describe('Create a product', function() {
        describe('success process', function() {
            it('should return an object (data) with status code 201', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', adminToken)
                .field('name', productData.name)
                .field('price', productData.price)
                .field('stock', productData.stock)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('name', 'price', 'stock', 'image')
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should return an object (data) with status code 401', function(done) {
                chai.request(app)
                .post('/products')
                .set('token', customerToken)
                .field('name', productData.name)
                .field('price', productData.price)
                .field('stock', productData.stock)
                .attach('image', fs.readFileSync('./test/images/pokemonshield.jpeg'), 'pokemonshield.jpeg')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
        })
    })
    describe('GET /products/', function() {
        describe('success process', function() {
            it('should return an array of objects with status code 200', function(done) {
                chai.request(app)
                .get('/products')
                .set('token', adminToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should return an error with status 403 because token is undefined', function(done) {
                chai.request(app)
                .get('/products')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })
        })
    })
    describe('GET /products/:id', function() {
        describe('success process', function() {
            it('should return a correct data with status 200', function(done) {
                chai.request(app)
                .get('/products/' + '5dca8614fb55071d413b5c48')
                .set('token', adminToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('_id', 'name', 'price', 'stock', 'image')
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should return an object with message product not found and status 404', function(done) {
                chai.request(app)
                .get('/products/' + '5dca8614fb55071d413b5c49')
                .set('token', adminToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('product not found')
                    done()
                })
            })
        })
    })
    describe('DELETE /products/:id', function() {
        describe('success process', function() {
            it('should return status 200', function(done) {
                chai.request(app)
                .delete('/products/' + '5dca9113de2b6320ac41a04f')
                .set('token', adminToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should return an object with message product not found and status 404', function(done) {
                chai.request(app)
                .delete('/products/' + '5dca8a4f54c8781f52b664ee')
                .set('token', adminToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('product not found')
                    done()
                })
            })
        })
    })
    describe('UPDATE /products/:id', function() {
        describe('success process', function() {
            it('should return an object (data) with status 200', function(done) {
                chai.request(app)
                .put('/products/' + "5dca87bc82db4f1de53b41e1")
                .set('token', adminToken)
                .send(updateProductData)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('name', 'price', 'stock', 'image')
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should return an object with message you are not authorized and status 401', function(done) {
                chai.request(app)
                .put('/products/' + "5dca8d70df4ce01f89479d35")
                .set('token', customerToken)
                .send(updateProductData)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('You are not authorized')
                    done()
                })
            })
            it('should return an object with message jwt must be provided and status 401', function(done) {
                chai.request(app)
                .put('/products/' + "5dca8d70df4ce01f89479d35")
                .send(updateProductData)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })
        })
    })
})
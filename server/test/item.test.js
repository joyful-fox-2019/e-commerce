// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const app = require('../app')
// const { Item, User } = require('../models')
// const { readFileSync } = require('fs')
// let tokenAdmin, tokenCustomer, id
// const { generateToken } = require('../helpers/jwt')
// const falseId = '5d63b24530a316a809302c57'
// const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// chai.use(chaiHttp)
// const expect = chai.expect
// const file = readFileSync('./test/test.jpeg')

// after(function(done) {
//     if (process.env.NODE_ENV === 'testing') {
//         Item.deleteMany({})
//             .then(_ => {
//                 console.log('testing: delete data item succes!')
//                 return User.deleteMany()
//             })
//             .then(_ => {
//                 console.log('testing: delete data user success!')
//                 done()  
//             })
//             .catch(console.log)
//     } 
// })

// before(function(done) {
//     User.create({
//         name: 'admin',
//         email: 'admin@admin.com',
//         password: '12345678',
//         role: 'admin'
//     })
//         .then((user) => {
//             let payload = {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//                 }
//             tokenAdmin = generateToken(payload)
//             return User.create({
//                 name: 'buyer',
//                 email: 'buyer@buyer.com',
//                 password: '12345678',
//                 role: 'customer'
//             })
//         })
//         .then((user) => {
//             let payload = {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//                 }
//             tokenCustomer = generateToken(payload)
//             done()
//         })
//         .catch(console.log)
// })

// describe('Item CRUD', function() {
//     this.timeout(10000)
//     describe('POST /items', function() {
//         describe('success process', function() {
//             it('should send an object (newItem, message) with 201 status code', function(done) {
//                 chai.request(app)
//                 .post('/click/items')
//                 .set({ token: tokenAdmin })
//                 .attach('image', file, 'file.jpeg')
//                 .field('name', 'milk')
//                 .field('description', 'for adult only')
//                 .field('price', '10000')
//                 .field('stock', '10')
//                 .end(function (err,res) {
//                     id = res.body.newItem._id
//                     expect(err).to.be.null
//                     expect(res).to.have.status(201)
//                     expect(res.body).to.be.an('object')
//                     expect(res.body).to.have.any.keys('newItem','message')
//                     expect(res.body.message).to.equal('success add item')
//                     done()
//                 })
//             })
//         })
//         describe('errors process', function() {
//             it ('should send error with 400 status code because missing token', function(done) {
//                 chai.request(app)
//                 .post('/click/items')
//                 .attach('image', file, 'file.jpeg')
//                 .field('name', 'milk')
//                 .field('description', 'for adult only')
//                 .field('price', '10000')
//                 .field('stock', '10')
//                 .end(function (err,res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('login first')
//                     done()
//                 })
//             })
//             it ('should send error with 400 status code because invalid token', function(done) {
//                 chai.request(app)
//                 .post('/click/items')
//                  .set({ token: invalidToken })
//                 .attach('image', file, 'file.jpeg')
//                 .field('name', 'milk')
//                 .field('description', 'for adult only')
//                 .field('price', '10000')
//                 .field('stock', '10')
//                 .end(function (err,res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('login first')
//                     done()
//                 })
//             })
//             it('should send error with 400 status code because customer not authorize to add item', function(done) {
//                 chai.request(app)
//                 .post('/click/items')
//                 .set({ token: tokenCustomer })
//                 .attach('image', file, 'file.jpeg')
//                 .field('name', 'milk')
//                 .field('description', 'for adult only')
//                 .field('price', '10000')
//                 .field('stock', '10')
//                 .end(function (err,res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('restricted admin only')
//                     done()
//                 })   
//             })
//             it('should send error with 400 status code because missing image value', function(done) {
//                 chai.request(app)
//                 .post('/click/items')
//                 .set({ token: tokenAdmin })
//                 .field('name', 'milk')
//                 .field('description', 'for adult only')
//                 .field('price', '10000')
//                 .field('stock', '10')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('image is required')
//                     done() 
//                 })
//             })
//             it('should send error with 400 status code because missing name value', function(done) {
//                 chai.request(app)
//                 .post('/click/items')
//                 .set({ token: tokenAdmin })
//                 .attach('image', file, 'file.jpeg')
//                 .field('description', 'for adult only')
//                 .field('price', '10000')
//                 .field('stock', '10')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('name is required')
//                     done() 
//                 })
//             })
//             it('should send error with 400 status code because missing description value', function(done) {
//                 chai.request(app)
//                 .post('/click/items')
//                 .set({ token: tokenAdmin })
//                 .attach('image', file, 'file.jpeg')
//                 .field('name', 'milk')
//                 .field('price', '10000')
//                 .field('stock', '10')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('description is required')
//                     done() 
//                 })
//             })
//             it('should send error with 400 status code because missing price value', function(done) {
//                 chai.request(app)
//                 .post('/click/items')
//                 .set({ token: tokenAdmin })
//                 .attach('image', file, 'file.jpeg')
//                 .field('name', 'milk')
//                 .field('description', 'for adult only')
//                 .field('stock', '10')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('price is required')
//                     done() 
//                 })
//             })
//             it('should send error with 400 status code because missing stock value', function(done) {
//                 chai.request(app)
//                 .post('/click/items')
//                 .set({ token: tokenAdmin })
//                 .attach('image', file, 'file.jpeg')
//                 .field('name', 'milk')
//                 .field('price', '10000')
//                 .field('description', 'for adult only')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('stock is required')
//                     done() 
//                 })
//             })
//         })
//     })
//     describe('GET /items', function() {
//         describe('succes process', function() {
//             it('should send an object (items) with 200 status code', function(done) {
//                 chai.request(app)
//                 .get('/click/items')
//                 .set({ token: tokenAdmin })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(200)
//                     expect(res.body).to.be.an('object')
//                     expect(res.body).to.have.any.keys('items')
//                     done()
//                 })
//             })
//             it('should send an object (items) with 200 status code', function(done) {
//                 chai.request(app)
//                 .get('/click/items')
//                 .set({ token: tokenCustomer })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(200)
//                     expect(res.body).to.be.an('object')
//                     expect(res.body).to.have.any.keys('items')
//                     done()
//                 })
//             })
//         })
//         describe('errors process', function() {
//             it('should send error with 400 status code because invalid token', function(done) {
//                 chai.request(app)
//                 .get('/click/items')
//                 .set({ token: invalidToken })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('login first')
//                     done() 
//                 })
//             })
//             it('should send error with 400 status code because missing token value', function(done) {
//                 chai.request(app)
//                 .get('/click/items')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('login first')
//                     done() 
//                 })
//             })
//         })
//     })
//     describe('GET /items/:id', function() {
//         describe('succes process', function() {
//             it('should send an object (item) with 200 status code', function(done) {
//                 chai.request(app)
//                 .get(`/click/items/${id}`)
//                 .set({ token: tokenAdmin })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(200)
//                     expect(res.body).to.be.an('object')
//                     expect(res.body).to.have.any.keys('item')
//                     done()
//                 })
//             })
//             it('should send an object (item) with 200 status code', function(done) {
//                 chai.request(app)
//                 .get(`/click/items/${id}`)
//                 .set({ token: tokenCustomer })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(200)
//                     expect(res.body).to.be.an('object')
//                     expect(res.body).to.have.any.keys('item')
//                     done()
//                 })
//             })
//         })
//         describe('errors process', function() {
//             it('should send error with 400 status code because invalid token', function(done) {
//                 chai.request(app)
//                 .get('/click/items')
//                 .set({ token: invalidToken })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('login first')
//                     done() 
//                 })
//             })
//             it('should send error with 400 status code because missing token value', function(done) {
//                 chai.request(app)
//                 .get('/click/items')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('login first')
//                     done() 
//                 })
//             })
//             it('should send error with 400 status code because invalid id', function(done) {
//                 chai.request(app)
//                 .get(`/click/items/${falseId}`)
//                 .set({ token: tokenAdmin })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('data not found')
//                     done() 
//                 })
//             })
//         })
//     })
//     describe('PUT /items/:id', function() {
//         describe('success process', function() {
//             it('should send an object (item) with 200 status code', function(done) {
//                 chai.request(app)
//                 .put(`/click/items/${id}`)
//                 .set({ token: tokenAdmin })
//                 .field('name', 'tea')
//                 .field('description', 'for kids')
//                 .field('stock', '1')
//                 .field('price', '1000')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(200)
//                     expect(res.body).to.be.an('object')
//                     expect(res.body).to.have.any.keys('item','message')
//                     expect(res.body.message).to.equal('success update item')
//                     done()
//                 })
//             })
//         })
//         describe('errors process', function() {
//             it('should send error with 400 status code because missing token value', function(done) {
//                 chai.request(app)
//                 .put(`/click/items/${id}`)
//                 .field('name', 'tea')
//                 .field('description', 'for kids')
//                 .field('stock', '1')
//                 .field('price', '1000')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('login first')
//                     done()
//                 })
//             }) 
//             it('should send error with 400 status code because ivalid token value', function(done) {
//                 chai.request(app)
//                 .put(`/click/items/${id}`)
//                 .set({ token: invalidToken })
//                 .field('name', 'tea')
//                 .field('description', 'for kids')
//                 .field('stock', '1')
//                 .field('price', '1000')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('login first')
//                     done()
//                 })
//             })
//             it('should send error with 400 status code because customer does not have authorization to update item', function(done) {
//                 chai.request(app)
//                 .put(`/click/items/${id}`)
//                 .set({ token: tokenCustomer })
//                 .field('name', 'tea')
//                 .field('description', 'for kids')
//                 .field('stock', '1')
//                 .field('price', '1000')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('restricted admin only')
//                     done()
//                 })
//             })
//             it('should send error with 400 status code because product id invalid', function(done) {
//                 chai.request(app)
//                 .put(`/click/items/${falseId}`)
//                 .set({ token: tokenAdmin })
//                 .field('name', 'tea')
//                 .field('description', 'for kids')
//                 .field('stock', '1')
//                 .field('price', '1000')
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('data not found')
//                     done()
//                 })
//             })    
//         })
//     })
//     describe('DELETE /items/:id', function() {
//         describe('succes process', function() {
//             it('should send an object (item, message) with 200 status code', function(done) {
//                 chai.request(app)
//                 .delete(`/click/items/${id}`)
//                 .set({ token: tokenAdmin })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(200)
//                     expect(res.body).to.be.an('object')
//                     expect(res.body).to.have.any.keys('item','message')
//                     expect(res.body.message).to.equal('success delete item')
//                     done()
//                 })
//             })
//         })
//         describe('errors process', function() {
//             it('should send error with 400 status code because missing token value', function(done) {
//                 chai.request(app)
//                 .delete(`/click/items/${id}`)
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('login first')
//                     done()
//                 })
//             }) 
//             it('should send error with 400 status code because ivalid token value', function(done) {
//                 chai.request(app)
//                 .delete(`/click/items/${id}`)
//                 .set({ token: invalidToken })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('login first')
//                     done()
//                 })
//             })
//             it('should send error with 400 status code because customer does not have authorization to update item', function(done) {
//                 chai.request(app)
//                 .delete(`/click/items/${id}`)
//                 .set({ token: tokenCustomer })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('restricted admin only')
//                     done()
//                 })
//             })
//             it('should send error with 400 status code because product id invalid', function(done) {
//                 chai.request(app)
//                 .delete(`/click/items/${falseId}`)
//                 .set({ token: tokenAdmin })
//                 .end(function (err, res) {
//                     expect(err).to.be.null
//                     expect(res).to.have.status(400)
//                     expect(res.body.error).to.be.an('array').that.includes('data not found')
//                     done()
//                 })
//             })    
//         })
//     })
// })

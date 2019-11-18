const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const Product = require('../models/product')
const User = require('../models/user')
const fs = require('fs')
const {generateToken} = require('../helpers/jwt')
const deletegcs = require('../helpers/deletegcs')

chai.use(chaiHttp)
const expect = chai.expect

let tokenAdmin
let tokenCustomer
let id
let image

before(function (done){
  this.timeout(15000)
  if(process.env.NODE_ENV === 'testing') {
    User.create({
      username: "admin1",
      email: "admin1@mail.com",
      password: "123456",
      role: 'admin'
    })
      .then(result => {
        let payloadAdmin = {email:result.email, _id:result._id, role:result.role}
        tokenAdmin = generateToken(payloadAdmin)
        return User.create({
          username: "customer1",
          email: "customer1@mail.com",
          password: "123456"
        })
      })
      .then(result => {
        let payloadCustomer = {email:result.email, _id:result._id, role:result.role}
        tokenCustomer = generateToken(payloadCustomer)
        console.log('create data testing')
        done()
      })
      .catch(console.log)
  }
})

after(function(done) {
  this.timeout(15000)
  if(process.env.NODE_ENV === 'testing') {
    User.deleteMany({})
      .then(() => {
        return Product.find()
      })
      .then(result => {
        // result.forEach(product => {
        //   product.image.forEach(image => {
        //     deletegcs(image)
        //   })
        // })
        
        // console.log(result);
        
        return Product.deleteMany()
      })
      .then(() => {
        console.log('reset data testing')
        done()
      })
      .catch(console.log)
  }
})

describe('Product Testing', function() {
  describe('POST /product', function() {
    describe('Success Test', function() {
      it('should send an object (name, description, price, stock, tags, image) with 201 status code', function(done) {
        this.timeout(15000)
        chai.request(app)
          .post('/product')
          .set('token', tokenAdmin)
          .field('name', 'Jam Tangan')
          .field('description', 'mahal')
          .field('price', 100000)
          .field('stock', 5)
          .field('tags', 'jam')
          .field('tags', 'ori')
          .attach('imgUrl', fs.readFileSync('./test/img/jam1.jpg'), 'jam1.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam2.jpg'), 'jam2.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys('name', 'description', 'price', 'stock', 'tags', 'image')
            id = res.body._id
            image = res.body.image
            done()
          })
      })
    })

    describe('Error Test', function() {
      it('should send an error with 400 status code because missing name value', function(done) {
        this.timeout(15000)
        chai.request(app)
          .post('/product')
          .set('token', tokenAdmin)
          .field('description', 'mahal')
          .field('price', 100000)
          .field('stock', 5)
          .field('tags', 'jam')
          .field('tags', 'ori')
          .attach('imgUrl', fs.readFileSync('./test/img/jam1.jpg'), 'jam1.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam2.jpg'), 'jam2.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Name is required')
            done()
          })
      })

      it('should send an error with 400 status code because missing description value', function(done) {
        this.timeout(15000)
        chai.request(app)
          .post('/product')
          .set('token', tokenAdmin)
          .field('name', 'Jam Tangan')
          .field('price', 100000)
          .field('stock', 5)
          .field('tags', 'jam')
          .field('tags', 'ori')
          .attach('imgUrl', fs.readFileSync('./test/img/jam1.jpg'), 'jam1.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam2.jpg'), 'jam2.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Description is required')
            done()
          })
      })

      it('should send an error with 400 status code because missing price value', function(done) {
        this.timeout(15000)
        chai.request(app)
          .post('/product')
          .set('token', tokenAdmin)
          .field('name', 'Jam Tangan')
          .field('description', 'mahal')
          .field('stock', 5)
          .field('tags', 'jam')
          .field('tags', 'ori')
          .attach('imgUrl', fs.readFileSync('./test/img/jam1.jpg'), 'jam1.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam2.jpg'), 'jam2.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Price is required')
            done()
          })
      })

      it('should send an error with 400 status code because missing stock value', function(done) {
        this.timeout(15000)
        chai.request(app)
          .post('/product')
          .set('token', tokenAdmin)
          .field('name', 'Jam Tangan')
          .field('description', 'mahal')
          .field('price', 100000)
          .field('tags', 'jam')
          .field('tags', 'ori')
          .attach('imgUrl', fs.readFileSync('./test/img/jam1.jpg'), 'jam1.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam2.jpg'), 'jam2.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Stock is required')
            done()
          })
      })

      it('should send an error with 400 status code because missing image value', function(done) {
        this.timeout(15000)
        chai.request(app)
          .post('/product')
          .set('token', tokenAdmin)
          .field('name', 'Jam Tangan')
          .field('description', 'mahal')
          .field('price', 100000)
          .field('stock', 5)
          .field('tags', 'jam')
          .field('tags', 'ori')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Image is required')
            done()
          })
      })

      it('should send an error with 400 status code because minimum stock is one', function(done) {
        this.timeout(15000)
        chai.request(app)
          .post('/product')
          .set('token', tokenAdmin)
          .field('name', 'Jam Tangan')
          .field('description', 'mahal')
          .field('price', 100000)
          .field('stock', 0)
          .field('tags', 'jam')
          .field('tags', 'ori')
          .attach('imgUrl', fs.readFileSync('./test/img/jam1.jpg'), 'jam1.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam2.jpg'), 'jam2.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Minimum stock is one')
            done()
          })
      })

      it('should send an error with 401 status code because required token', function(done) {
        this.timeout(15000)
        chai.request(app)
          .post('/product')
          .field('name', 'Jam Tangan')
          .field('description', 'mahal')
          .field('price', 100000)
          .field('stock', 5)
          .field('tags', 'jam')
          .field('tags', 'ori')
          .attach('imgUrl', fs.readFileSync('./test/img/jam1.jpg'), 'jam1.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam2.jpg'), 'jam2.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Json Web Token Error')
            expect(res.body.errors).to.be.an('array').that.includes('JsonWebTokenError')
            done()
          })
      })

      it('should send an error with 403 status code because not authorized', function(done) {
        this.timeout(15000)
        chai.request(app)
          .post('/product')
          .set('token', tokenCustomer)
          .field('name', 'Jam Tangan')
          .field('description', 'mahal')
          .field('price', 100000)
          .field('stock', 5)
          .field('tags', 'jam')
          .field('tags', 'ori')
          .attach('imgUrl', fs.readFileSync('./test/img/jam1.jpg'), 'jam1.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam2.jpg'), 'jam2.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Authorization Failed')
            expect(res.body.errors).to.be.an('array').that.includes('Not Authorized')
            done()
          })
      })

    })
  })

  describe('GET /product', function() {
    describe('Success Test', function() {
      it('should send an array of object (_id, name, description, price, stock, image, tags) with 200 status code', function(done) {
        this.timeout(10000)
        chai.request(app)
          .get('/product')
          .set('token', tokenCustomer)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.be.an('object').to.have.any.keys('_id', 'name', 'description', 'price', 'stock', 'image', 'tags')
            done()
          })
      })
    })
  })

  describe('GET /product/:id', function() {
    describe('Success Test', function() {
      it('should send an object (_id, name, description, price, stock, image, tags) with 200 status code', function(done) {
        this.timeout(10000)
        chai.request(app)
          .get(`/product/${id}`)
          .set('token', tokenCustomer)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('_id', 'name', 'description', 'price', 'stock', 'image', 'tags')
            done()
          })
      })
    })

    describe('Error Test', function() {
      it('should send an error with 404 status code because product not found', function(done) {
        this.timeout(10000)
        chai.request(app)
          .get('/product/5dcac07413eb1d6e2d3f2206')
          .set('token', tokenCustomer)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('Product Not Found')
            done()
          })
      })

      it('should send an error with 401 status code because required token', function(done) {
        this.timeout(10000)
        chai.request(app)
          .get(`/product/${id}`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Json Web Token Error')
            expect(res.body.errors).to.be.an('array').that.includes('JsonWebTokenError')
            done()
          })
      })

    })

  })

  describe('PUT /product/:id', function() {
    describe('Success Test', function() {
      it('should send an object (name, description, price, stock, tags, image) with 200 status code', function(done) {
        this.timeout(15000)
        chai.request(app)
          .put(`/product/${id}`)
          .set('token', tokenAdmin)
          .field('name', 'Jam Dinding')
          .field('description', 'murah')
          .field('price', 10000)
          .field('stock', 3)
          .field('tags', 'jam')
          .field('tags', 'kw')
          .field('remove', image[0])
          .field('remove', image[1])
          .attach('imgUrl', fs.readFileSync('./test/img/jam3.jpg'), 'jam3.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam4.jpg'), 'jam4.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('name', 'description', 'price', 'stock', 'tags', 'image')
            id = res.body._id
            image = res.body.image
            done()
          })
      })
    })

    describe('Error Test', function() {
      it('should send an error with 400 status code because missing name value', function(done) {
        this.timeout(15000)
        chai.request(app)
          .put(`/product/${id}`)
          .set('token', tokenAdmin)
          .field('name', '')
          .field('description', 'murah')
          .field('price', 10000)
          .field('stock', 3)
          .field('tags', 'jam')
          .field('tags', 'kw')
          .attach('imgUrl', fs.readFileSync('./test/img/jam3.jpg'), 'jam3.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam4.jpg'), 'jam4.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Name is required')
            done()
          })
      })

      it('should send an error with 400 status code because missing description value', function(done) {
        this.timeout(15000)
        chai.request(app)
          .put(`/product/${id}`)
          .set('token', tokenAdmin)
          .field('name', 'Jam Dinding')
          .field('description', '')
          .field('price', 10000)
          .field('stock', 3)
          .field('tags', 'jam')
          .field('tags', 'kw')
          .attach('imgUrl', fs.readFileSync('./test/img/jam3.jpg'), 'jam3.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam4.jpg'), 'jam4.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Description is required')
            done()
          })
      })

      it('should send an error with 400 status code because missing price value', function(done) {
        this.timeout(15000)
        chai.request(app)
          .put(`/product/${id}`)
          .set('token', tokenAdmin)
          .field('name', 'Jam Dinding')
          .field('description', 'murah')
          .field('price', '')
          .field('stock', 3)
          .field('tags', 'jam')
          .field('tags', 'kw')
          .attach('imgUrl', fs.readFileSync('./test/img/jam3.jpg'), 'jam3.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam4.jpg'), 'jam4.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Price is required')
            done()
          })
      })

      it('should send an error with 400 status code because missing stock value', function(done) {
        this.timeout(15000)
          chai.request(app)
          .put(`/product/${id}`)
          .set('token', tokenAdmin)
          .field('name', 'Jam Dinding')
          .field('description', 'murah')
          .field('price', 10000)
          .field('stock', '')
          .field('tags', 'jam')
          .field('tags', 'kw')
          .attach('imgUrl', fs.readFileSync('./test/img/jam3.jpg'), 'jam3.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam4.jpg'), 'jam4.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Stock is required')
            done()
          })
      })

      it('should send an error with 400 status code because missing image value', function(done) {
        this.timeout(15000)
        chai.request(app)
          .put(`/product/${id}`)
          .set('token', tokenAdmin)
          .field('name', 'Jam Dinding')
          .field('description', 'murah')
          .field('price', 10000)
          .field('stock', 3)
          .field('tags', 'jam')
          .field('tags', 'kw')
          .field('remove', image[0])
          .field('remove', image[1])
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Image is required')
            done()
          })
      })

      it('should send an error with 400 status code because minimum stock is one', function(done) {
        this.timeout(15000)
        chai.request(app)
        .put(`/product/${id}`)
        .set('token', tokenAdmin)
        .field('name', 'Jam Dinding')
        .field('description', 'murah')
        .field('price', 10000)
        .field('stock', 0)
        .field('tags', 'jam')
        .field('tags', 'kw')
        .attach('imgUrl', fs.readFileSync('./test/img/jam3.jpg'), 'jam3.jpg')
        .attach('imgUrl', fs.readFileSync('./test/img/jam4.jpg'), 'jam4.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('Minimum stock is one')
            done()
          })
      })

      it('should send an error with 401 status code because required token', function(done) {
        this.timeout(15000)
        chai.request(app)
          .put(`/product/${id}`)
          .field('name', 'Jam Dinding')
          .field('description', 'murah')
          .field('price', 10000)
          .field('stock', 3)
          .field('tags', 'jam')
          .field('tags', 'kw')
          .attach('imgUrl', fs.readFileSync('./test/img/jam3.jpg'), 'jam3.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam4.jpg'), 'jam4.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Json Web Token Error')
            expect(res.body.errors).to.be.an('array').that.includes('JsonWebTokenError')
            done()
          })
      })

      it('should send an error with 403 status code because not authorized', function(done) {
        this.timeout(15000)
        chai.request(app)
          .put(`/product/${id}`)
          .set('token', tokenCustomer)
          .field('name', 'Jam Dinding')
          .field('description', 'murah')
          .field('price', 10000)
          .field('stock', 0)
          .field('tags', 'jam')
          .field('tags', 'kw')
          .attach('imgUrl', fs.readFileSync('./test/img/jam3.jpg'), 'jam3.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam4.jpg'), 'jam4.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Authorization Failed')
            expect(res.body.errors).to.be.an('array').that.includes('Not Authorized')
            done()
          })
      })

      it('should send an error with 404 status code because product not found', function(done) {
        this.timeout(15000)
          chai.request(app)
          .put(`/product/5dcb7ea5f95cac0b41b5eac7`)
          .set('token', tokenAdmin)
          .field('name', 'Jam Dinding')
          .field('description', 'murah')
          .field('price', 10000)
          .field('stock', 0)
          .field('tags', 'jam')
          .field('tags', 'kw')
          .attach('imgUrl', fs.readFileSync('./test/img/jam3.jpg'), 'jam3.jpg')
          .attach('imgUrl', fs.readFileSync('./test/img/jam4.jpg'), 'jam4.jpg')
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('Product not Found')
            done()
          })
      })

    })
  })

  describe('DELETE /product', function() {
    describe('Success Test', function() {
      it('should send an object (name, description, price, stock, tags, image) with 200 status code', function(done) {
        this.timeout(15000)
        chai.request(app)
          .delete(`/product/${id}`)
          .set('token', tokenAdmin)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('name', 'description', 'price', 'stock', 'tags', 'image')
            done()
          })
      })
    })
  
    describe('Error Test', function() {
      it('should send an error with 401 status code because required token', function(done) {
        this.timeout(15000)
        chai.request(app)
          .delete(`/product/${id}`)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Json Web Token Error')
            expect(res.body.errors).to.be.an('array').that.includes('JsonWebTokenError')
            done()
          })
      })
  
      it('should send an error with 403 status code because not authorized', function(done) {
        this.timeout(15000)
        chai.request(app)
          .delete(`/product/${id}`)          
          .set('token', tokenCustomer)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Authorization Failed')
            expect(res.body.errors).to.be.an('array').that.includes('Not Authorized')
            done()
          })
      })

      it('should send an error with 404 status code because product not found', function(done) {
        this.timeout(15000)
          chai.request(app)
          .delete(`/product/5dcb7ea5f95cac0b41b5eac7`)
          .set('token', tokenAdmin)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message', 'errors')
            expect(res.body.message).to.equal('Invalid Input')
            expect(res.body.errors).to.be.an('array').that.includes('Product not Found')
            done()
          })
      })
    })
  })

})
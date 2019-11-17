const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const generateToken = require('../helpers/generateToken')

chai.use(chaiHttp)
const expect = chai.expect

let token = ''

before(function(done) {
  const data = {
    name: 'gintoki',
    email: 'gintoki@mail.com',
    password: 'gintoki',
    address: 'Kuningan'
  }

  User.create(data) 
    .then(user => {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.email
      }
      token = generateToken(payload)
      console.log('Users data for testing is created')
    })
    .catch(console.log)
    .finally(() => {
      done()
    })
})

after(function(done) {
  if(process.env.NODE_ENV == 'testing') {
    User.deleteMany({})
      .then( () => {
        console.log('User is deleted after testing')
        done()
      })
      .catch(console.log)
  }
})

describe('Product Routes', function() {
  let newProduct = {
    name: 'Gintama',
    description: 'One of the GOATs',
    img: 'Gintoki',
    stock: 2,
    price: 100,
    category: 'Single Card'
  }
  describe('POST /posts', function() {
    describe('SuccessProcess', function() {
      it('Should send an object (product, msg) with 201 status code', function(done) {
        chai.request(app)
        .post('/products')
        .set('token', token)
        .send(newProduct)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys('product', 'msg')
          expect(res.body.msg).to.equal('New product is successfully added')
          done()
        })
      })
    })
    describe('ErrorProcess', function() {
      it('Should send an error with 400 status code because missing name value', function(done) {
        const withoutName = { ...newProduct }
        delete withoutName.name
        chai.request(app)
        .post('/products')
        .set('token', token)
        .send(withoutName)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Name is required')
          done()
        })
      })
      it('Should send an error with 400 status code because missing stock value', function(done) {
        chai.request(app)
        .post('/products')
        .set('token', token)
        .send({
          name: 'Gintama',
          description: 'One of the GOATs',
          img: 'Gintoki',
          price: 100,
          Category: 'Anime'
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Stock is required')
          done()
        })
      });
      it('Should send an error with 400 status code because missing price value', function(done) {
        chai.request(app)
        .post('/products')
        .set('token', token)
        .send({
          name: 'Gintama',
          description: 'One of the GOATs',
          img: 'Gintoki',
          stock: 1,
          Category: 'Anime'
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Price is required')
          done()
        })
      });
      it('Should send an error with 400 status code because missing description value', function(done) {
        chai.request(app)
        .post('/products')
        .set('token', token)
        .send({
          name: 'Gintama',
          img: 'Gintoki',
          price: 1,
          stock: 1,
          Category: 'Anime'
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Description is required')
          done()
        })
      });
      it('Should send an error with 400 status code because missing img value', function(done) {
        chai.request(app)
        .post('/products')
        .set('token', token)
        .send({
          name: 'Gintama',
          description: 'One of the GOATs',
          price: 1,
          stock: 1,
          Category: 'Anime'
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Image is required')
          done()
        })
      })
      it('Should send an error with 400 status code because missing category value', function(done) {
        chai.request(app)
        .post('/products')
        .set('token', token)
        .send({
          name: 'Gintama',
          description: 'One of the GOATs',
          img: 'Gintoki',
          price: 1,
          stock: 1
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Validation Error')
          expect(res.body.errors).to.be.an('array').that.includes('Category is required')
          done()
        })
      });
    })
  })
  describe('GET /products', function() {
    describe('SuccessProcess', function() {
      it('Should send a products array of object with 200 status code', function(done) {
        chai.request(app)
        .get('/products')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body[0]).to.have.property('_id');
          expect(res.body[0]).to.have.property('name');
          expect(res.body[0]).to.have.property('description');
          expect(res.body[0]).to.have.property('img');
          expect(res.body[0]).to.have.property('stock');
          expect(res.body[0]).to.have.property('price');
          done()
        })
      })
    })
  })
  describe('PUT /posts/:id', function() {
    const editedProduct = {
      name: 'Hunter X Hunter',
      description: 'One of the GOATs',
      img: 'Gon',
      stock: 2,
      price: 100
    }
    describe('SuccessProcess', function() {
      it('Should send an object (product, msg) with 200 status code', function(done) {
        chai.request(app)
        .put('/products/5dcffa34b62fe10a09166913')
        .set('token', token)
        .send(editedProduct)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('product', 'msg')
          expect(res.body.msg).to.equal('Products data is successfully updated')
          done()
        })
      })
    })
    describe('ErrorProcess', function() {
      it('Should send an error with 500 status code because of invalid id', function(done) {
        chai.request(app)
        .put('/products/asd')
        .set('token', token)
        .send(editedProduct)
        .end(function(err, res) {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('Internal Server Error')
          done()
        })
      })
      it('Should send an error with 400 status code because user is not logged in', function(done) {
        chai.request(app)
        .put('/products/5dcffa34b62fe10a09166913')
        .send(editedProduct)
        .end(function(err, res) {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
          expect(res.body.msg).to.equal('jwt must be provided')
          done()
        })
      })
    })
    describe('DELETE /posts/:id', function() {
      describe('SuccessProcess', function() {
        it('Should send an object (product, msg) with 200 status code', function(done) {
          chai.request(app)
          .delete('/products/5dcffa34b62fe10a09166913')
          .set('token', token)
          .send(editedProduct)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('product', 'msg')
            expect(res.body.msg).to.equal('Product is successfully deleted')
            done()
          })
        })
      })
      describe('ErrorProcess', function() {
        it('Should send an error with 500 status code because of invalid id', function(done) {
          chai.request(app)
          .delete('/products/asd')
          .set('token', token)
          .send(editedProduct)
          .end(function(err, res) {
            expect(res).to.have.status(500)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Internal Server Error')
            done()
          })
        })
        it('Should send an error with 400 status code because user is not logged in', function(done) {
          chai.request(app)
          .delete('/products/5dcffa34b62fe10a09166913')
          .send(editedProduct)
          .end(function(err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('jwt must be provided')
            done()
          })
        })
      })
    })
  })
})


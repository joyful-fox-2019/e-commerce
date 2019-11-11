const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { signToken } = require('../helpers/jwt');
const User = require('../models/user');
const Product = require('../models/product');

chai.use(chaiHttp);
const expect = chai.expect;

let initialUser = '';
let initialToken = '';
let initialProduct = {};



let falseId = '748jrp32njnfjfnfdfa'
let falseToken = 'wifjpw3ihgi42-hf924-fji3fj-fji3fjei0fs'

before(function () {
  User.create({ username: 'eric', email: 'ericsudhartio@mgail.com', password: 'lalalalala' })
    .then(user => {
      initialUser = user;
      const token = signToken({ id: user._id, username: user.username, email: user.email })
      initialToken = token;
      const data = {
        condition: 'new',
        description: 'new Product',
        name: 'product',
        price: 1000,
        stock: 10,
        product_image: 'http://lala.com'
      }
      return Product.create(data)
    })
    .then(product => {
      initialProduct = product
    })
    .catch(console.log)
})

after(function () {
  if(process.env.NODE_ENV == 'testing') {
    Product.deleteMany({})
      .then(() => console.log('testing product delete success'))
      .catch(console.log)
  }
})

describe('Product Routes', function () {
  let newProduct = {
    condition: 'allnew',
    description: 'allnew Product',
    name: 'yea',
    price: 3333,
    stock: 32,
    product_image: 'http://lala.codsfm',
    owner: initialUser._id
  }
  
  this.timeout(10000);

  // POST product 1 success  &  4 errors
  describe('/POST /products', function () {
    let link = '/products';
    describe('success process', function () {
      it('should send an object (product, msg) with 201 status code', function (done) {
        chai.request(app)
          .post(link)
          .send(newProduct)
          .set('token', initialToken)
          .end(function(err,res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(newProduct.price).to.be.a('number')
            expect(newProduct.stock).to.be.a('number')
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'product')
            expect(res.body.msg).to.equal('success create a product');
            done()
          })
      })
    })
    describe('error process', function () {
      it('should send an error with 400 status code because empty description', function (done) {
        let falseProduct = { ...newProduct }
        delete falseProduct.description;
        chai.request(app)
          .post(link)
          .send(falseProduct)
          .set('token', initialToken)
          .end(function (err,res)  {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('description is required')
            done()
          })
      })
      it('should send an error with 400 status code because empty name', function (done) {
        let falseProduct = { ...newProduct }
        delete falseProduct.name;
        chai.request(app)
          .post(link)
          .send(falseProduct)
          .set('token', initialToken)
          .end(function (err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.includes('name is required')
            done()
          })
      })
      it('should send an error with 400 status code because invalid type data Price', function (done) {
        let falseProduct = { ...newProduct }
        falseProduct.price = 'lala';
        chai.request(app)
          .post(link)
          .send(falseProduct)
          .set('token', initialToken)
          .end(function (err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error');
            expect(res.body.errors).to.be.an('array').that.includes('price must be Number')
            done()
          })
      })
      it('should send an error with 400 status code because invalid type data Stock', function (done) {
        let falseProduct = { ...newProduct }
        falseProduct.stock = 'yaya';
        chai.request(app)
          .post(link)
          .send(falseProduct)
          .set('token', initialToken)
          .end(function (err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
            expect(res.body.msg).to.equal('Validation Error');
            expect(res.body.errors).to.be.an('array').that.includes('stock must be Number')
            done()
          })
      })
      it('should send an error with 400 status code because empty stock', function (done) {
          let falseProduct = { ...newProduct }
          delete falseProduct.stock;
          chai.request(app)
            .post(link)
            .send(falseProduct)
            .set('token', initialToken)
            .end(function (err,res)  {
              expect(err).to.be.null
              expect(res).to.have.status(400)
              expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
              expect(res.body.msg).to.equal('Validation Error')
              expect(res.body.errors).to.be.an('array').that.includes('stock is required')
              done()
            })
      })
      it('should send an error with 400 status code because empty price', function (done) {
          let falseProduct = { ...newProduct }
          delete falseProduct.price;
          chai.request(app)
            .post(link)
            .send(falseProduct)
            .set('token', initialToken)
            .end(function (err,res)  {
              expect(err).to.be.null
              expect(res).to.have.status(400)
              expect(res.body).to.be.an('object').to.have.any.keys('msg', 'errors')
              expect(res.body.msg).to.equal('Validation Error')
              expect(res.body.errors).to.be.an('array').that.includes('price is required')
              done()
            })
      })
    })
  })
  
  // Get Products 1 success
  describe('GET /products', function () {
    let link = '/products';
    describe('success process', function () {
      it('should send an object with 200 status Code include populate product', function (done) {
        chai.request(app)
          .get(link)
          .end(function (err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('products')
            done()
          })
      })
    })
  })

  let link = `/products/${initialProduct._id}`;

  // Get One Product 1 success
  describe('GET /products/:id', function () {
    describe('success process', function () {
      it('should send and Object with 200 status code include populate product', function (done) {
        chai.request(app)
          .get(link)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('product')
            done()
          })
      })
    })
  })

  // Put product  1 success & 4 errors
  describe('PUT /products/:id', function () {
    let updateProduct = {
      condition: 'allnew222',
      description: 'allnew Product2222',
      name: 'yea22',
      price: 33323,
      stock: 232,
      product_image: 'http://la211ela.codsfm'
    }

    let localToken = ''
    User.create({ username: 'babang', email: 'babang@gmail.com', password: 'babang'})
      .then(user => {
        localToken = signToken({ id: user._id, email: user.email, username: user.username })
      })
      .catch(console.log)


    describe('success process', function () {
      it('should send an object with 201 status code include new update', function (done) {
        chai.request(app)
          .put(link)
          .set('token', initialToken)
          .send(updateProduct)
          .end(function(err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys('msg', 'product')
            expect(res.body.msg).to.equal('success update product')
            done()
          })
      })
    })

    describe('error process', function () {
      it('should send an error with 401 status code because authorization', function (done) {
        chai.request(app)
          .put(link)
          .set('token', localToken)
          .send(updateProduct)
          .end(function (err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('authorization error')
            done()
          })

      })

      it('should send an error with 400 status code because invalid token', function (done) {
        chai.request(app)
          .put(link)
          .set('token', falseToken)
          .send(udpateProduct)
          .end(function (err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Invalid Token')
        })
      })

      it('should send an error with 403 status code because token is undifined' ,function (done) {
        chai.request(app)
          .put(link)
          .send(updateProduct)
          .end(function (err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Authentication')
            done()
          })
      })
    })
  })

  describe('DELETE /products/:id', function () {
    describe('success process', function () {
      it('should send an Object with 200 status code', function (done) {
        chai.request(app)
          .delete(link)
          .set('token', initialToken)
          .end(function(err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Success deleting products')
          })
      })
    })

    describe('error process', function () {
      it('should send an error with 404 status code because productid', function (done) {
        let falseId = 'jknafewfwefwef';
        chai.request(app)
          .delete(`/products/${falseId}`)
          .set('token', initialToken)
          .end(function (err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('product not valid')
            done()
          })
      })

      it('should send an error with 400 status code because invalid token', function(done) {
        chai.request(app)
          .delete(link)
          .set('token', falseToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Invalid Token')
            done()
          })
      })

      it('should send an error with 403 status code because token is undefined', function (done) {
        chai.request(app)
          .delete(link)
          .end(function (err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('Authentication Error')
          })
      })

      it('should send an error with 401 status code because authorization', function (done) {
        chai.request(app)
          .put(link)
          .set('token', localToken)
          .end(function (err,res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('msg')
            expect(res.body.msg).to.equal('authorization error')
            done()
          })

      })

    })
  })

})
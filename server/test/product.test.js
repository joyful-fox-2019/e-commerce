const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/User')
const app = require('../app')
const {sign} = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect

let signUser = {
  username: 'thepainsuki',
  email: 'thepainsuki@mail.com',
  password: 'thepainsuki',
  admin: true
}

let product = {
  name: 'product with title',
  price: 20000,
  stock: 20,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  file: 'https://images.unsplash.com/photo-1573614035635-336aff831d7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
}

let token = ''
let falseToken = 'asdaj3rqac3'
let falseId = 'aslkcxoajwkn89awcuoda'

function randomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

before(function(done){
  User.create(signUser)
    .then(user=>{
      token = sign({
        _id : user._id,
        email: user.email,
        admin: user.admin
      })
      console.log(user)
      done()
    })
    .catch(err=>{
      console.log(err)
    })
})

after(function(done){
  if(process.env.NODE_ENV === 'testing'){
    User.deleteMany()
      .then(_=>{
        console.log('delete success')
        done()
      })
      .catch(console.log)
  }
})

describe('Product router', function(){
  describe('POST /projects/', function(){
    describe('success', function(){
      it('should return object (name, description, stock, price, user_id) with 201 status code', function(done){
        chai.request(app)
          .post('/products/')
          .send(product)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').that.contain.keys('name', 'price', 'description', 'stock', 'image')
            done()
          })
      })
    })

    describe('error', function(){
      it('should return an error with status code 400 because missing name', function(done){
        let missingName = {...product}
        delete missingName.name
        chai.request(app)
          .post('/products/')
          .send(missingName)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Name is empty')
            done()
          })
      })

      it('should return an error with status code 400 because missing price', function(done){
        let missingPrice = {...product}
        delete missingPrice.price
        chai.request(app)
          .post('/products/')
          .send(missingPrice)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Price is empty')
            done()
          })
      })

      it('should return an error with status code 400 because missing stock', function(done){
        let missingStock = {...product}
        delete missingStock.stock
        chai.request(app)
          .post('/products/')
          .send(missingStock)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Stock is empty')
            done()
          })
      })

      it('should return an error with status code 400 because missing description', function(done){
        let missingDescription = {...product}
        delete missingDescription.description
        chai.request(app)
          .post('/products/')
          .send(missingDescription)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Description is empty')
            done()
          })
      })

      it('should return an error with status code 400 because missing description', function(done){
        let missingDescription = {...product}
        delete missingDescription.description
        chai.request(app)
          .post('/products/')
          .send(missingDescription)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Description is empty')
            done()
          })
      })

      it('should return an error with status code 400 because name too short', function(done){
        let missingName = {...product}
        delete missingName.name
        missingName.name = 'short'
        chai.request(app)
          .post('/products/')
          .send(missingName)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Title too short')
            done()
          })
      })

      it('should return an error with status code 400 because name too long', function(done){
        let missingName = {...product}
        delete missingName.name
        missingName.name = randomString(150)
        chai.request(app)
          .post('/products/')
          .send(missingName)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Title too long')
            done()
          })
      })

      it('should return an error with status code 400 because description too short', function(done){
        let missingDescription = {...product}
        delete missingDescription.description
        missingDescription.description = 'short'
        chai.request(app)
          .post('/products/')
          .send(missingDescription)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Description too short')
            done()
          })
      })

      it('should return an error with status code 400 because description too long', function(done){
        let missingDescription = {...product}
        delete missingDescription.description
        missingDescription.description = randomString(600)
        chai.request(app)
          .post('/products/')
          .send(missingDescription)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Description too long')
            done()
          })
      })

      it('should return an error with status code 400 because stock not enough', function(done){
        let missingStock = {...product}
        delete missingStock.stock
        missingStock.stock = 0
        chai.request(app)
          .post('/products/')
          .send(missingStock)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('stock can`t be 0')
            done()
          })
      })

      it('should return an error with status code 400 because price too cheap', function(done){
        let missingPrice = {...product}
        delete missingPrice.price
        missingPrice.price = 50
        chai.request(app)
          .post('/products/')
          .send(missingPrice)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Price too cheap')
            done()
          })
      })

      it('should return an error with status code 400 because price too cheap', function(done){
        let missingPrice = {...product}
        delete missingPrice.price
        missingPrice.price = 50
        chai.request(app)
          .post('/products/')
          .send(missingPrice)
          .set('access_token', token)
          .end(function(err, res){
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').that.contain.keys('errors', 'message')
            expect(res.body.message).to.equal('Validation Error')
            expect(res.body.errors).to.be.an('array').that.include('Price too cheap')
            done()
          })
      })

    })
  })
})
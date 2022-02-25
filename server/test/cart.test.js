const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect

let initialProduct = {}
let initialToken = ''
let initialUserId = ''

let newProduct = {
  name: "Something2",
  price: 300000,
  qty: 12,
  imgUrl: 'https://storage.googleapis.com/dipaecommerce/1573610531954-death-stranding-logo-600x337.jpg'
}

before(async () => {
  try{
    let user = await User.create({
      name: 'customer',
      email: 'customer@gmail.com',
      password: '123456',
      role: 'customer'
    })
    initialUserId = user._id
    initialToken = generateToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })
    let productData = await Product.create({
      name: "Something",
      price: 200000,
      qty: 10,
      imgUrl: 'https://storage.googleapis.com/dipaecommerce/1573610531954-death-stranding-logo-600x337.jpg'
    })
    initialProduct = productData
  }
  catch(err){
    console.log(err)
  }
})

after(function(done) {
  if(process.env.NODE_ENV === 'testing') {
    Product.deleteMany({})
      .then(_ => {
        console.log('testing: delete data product success!')
        return User.deleteMany({})
      })
      .then(_ => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

describe('Cart Routes', () => {

  describe('PATCH /carts/addToCart/:ProductId', () => {
    describe('Success add to cart', () => {
      it('Should return (message) with 200 status code', (done) => {
        chai.request(app)
        .patch(`/carts/addToCart/${initialProduct._id}`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Succesfuly added to cart!')
          done()
        })
      })
    })
    describe('Fail add to cart', () => {
      it('Should return (message) with 400 status code with duplicated product id', (done) => {
        chai.request(app)
        .patch(`/carts/addToCart/${initialProduct._id}`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('This item already in your cart!')
          done()
        })
      })
      it('Should return (message) with 400 status code with duplicated product id', (done) => {
        chai.request(app)
        .patch(`/carts/addToCart/5dcc7f08f81b0f306dc3533a`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Product not found')
          done()
        })
      })
    })
  })

  describe('GET /carts', () => {
    describe('Success get cart data', () => {
      it('Should return [array of obeject] with 200 status code', (done) => {
        chai.request(app)
        .get(`/carts`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
  })

  describe('PATCH /updateAmount/:ProductId', () => {
    describe('Success update amount data in user cart', () => {
      it('should return response with 200 status code', (done) => {
        chai.request(app)
        .patch(`/carts/updateAmount/${initialProduct._id}/6`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'userData')
          expect(res.body.message).to.equal('Succesfuly update amount')
          done()
        })
      })
    })
  })
  
  describe('PATCH /deleteProductFromCart/:CartId', () => {
    describe('Success delete cart', () => {
      it("Should return response with 200 status code", (done) => {
        User.findOne({_id:initialUserId}).then(userData => {
          chai.request(app)
          .patch(`/carts/deleteProductFromCart/${userData.cart[0]._id}`)
          .set('access_token',initialToken)
          .end((err,res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('message','deleteCartData')
            expect(res.body.message).to.equal('Successfuly delete cart')
            done()
          })
        })
      })
    })
  })

})
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const Product = require('../models/product')


const expect = chai.expect

after(function(done) {
  Product.deleteMany({}, () => {
    console.log(`testing : success deleting user data`);
    done()
  })
})

describe('product', function() {

  describe('GET/products', function() {
    
    describe('get all product on success', function() {
      it('App should return status code 200 and an array containing object of each product which has id, name, imageSource, price, description, stock', function(done) {
        chai
          .request(app)
          .get('/products')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.all.keys('_id', 'name', 'imageSource', 'price', 'description', 'stock')
            expect(res.body[0]._id).to.be.a('string')
            expect(res.body[0].name).to.be.a('string')
            expect(res.body[0].imageSource).to.be.a('string')
            expect(res.body[0].price).to.be.a('number')
            expect(res.body[0].description).to.be.a('string')
            expect(res.body[0].stock).to.be.a('number')
            done()
          })
      })
    })
    // describe('get all product on failed', function() {
    //   it('App should return an error message ')
    // })
  })


  describe('POST/products',function() {

    describe('create new product error due to no token', function() {
      it('Return an error authorization message with status 401', function(done) {
        let newProduct = {
          name: 'Clay potter',
          imageSource: 'https://i.pinimg.com/564x/7e/c8/41/7ec841162ba6ebe61dd892f0234ffd6c.jpg',
          price: 2888000,
          stock: 5
        }
        chai 
          .request(app)
          .post('/products')
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            done()
          })
      })
    })

    describe('POST/products', function() {
      describe('error on creation due to validation', function() {
        it('')
      })
    })
  })

})

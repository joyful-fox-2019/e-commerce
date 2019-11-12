const chai = require('chai')
const chaiHttp = require('chai-http')
const Product = require('../models/product')
const User = require('../models/user')
const { genToken } = require('../helpers/jwt')

const expect = chai.expect
chai.use(chaiHttp)

let admin = {
  username: 'admin',
  email: 'admin@admin.com',
  password: 'admin123'
}

let newProduct = {
  name: 'product baru',
  price: 12345,
  stock: 12,
  image: 'test.blabla.com'
}

let token

before(function(){
  User.create(admin)
    .then(user=> {
      console.log('created initial user')
      token = genToken({ id: user._id, role: user.role})
    })
    .catch(console.log)
})

after(function(done) {
  if(process.env.NODE_ENV === 'testing') {
    User.deleteMany()
      .then(()=> {
        console.log('initial user deleted')
        return Product.deleteMany()
      })
      .then(()=> {
        console.log('product test finished')
        done()
      })
      .catch(console.log)
      
  }
})

describe('Product Test', function () {
  describe('POST /products', function () {
    it('Should return object of (product, message) with status 201 when successfully created product', function (done) {
    setTimeout(() => { 
      chai
      .request(app)
      .post('/products')
      .field('name', 'new product')
      .field('stock', 10)
      .field('price', 12345)
      .attach('image', './wolf.jpg', 'wolf.jpg')
      .set('token', token)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object').to.have.any.keys('product', 'message')
        expect(res.body.product).to.be.an('object').to.have.any.keys('stock', 'price', 'favourites', 'name', 'sold', 'image', 'viewed')
      })
      })
    }, 4000);
  })
})

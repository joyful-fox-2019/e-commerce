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
  describe('GET/')
})


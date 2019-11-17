const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://myecommerce-server.nadhiljanitra.xyz'
})

module.exports = instance

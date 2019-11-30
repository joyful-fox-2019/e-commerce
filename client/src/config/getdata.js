import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

// baseURL: 'https://ecommerceserver.dipaproject.online'

export default instance

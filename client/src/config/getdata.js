import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce.dipaproject.online',
})

// baseURL: 'http://localhost:3000'

export default instance

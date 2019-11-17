import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerceserver.dipaproject.online',
})

// baseURL: 'http://localhost:3000'

export default instance

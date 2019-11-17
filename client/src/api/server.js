import axios from 'axios'

let server = axios.create({
  baseURL: 'http://localhost:3000'
})

export default server

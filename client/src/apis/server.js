import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://dreamcarserver.dreamcarofficial.com'
})

export default instance

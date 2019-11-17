import axios from 'axios'

// DEVELOPMENT
// const server = 'http://192.168.1.31:3000'

// DEPLOY
const server = 'http://api.bikelah.mardii.site'

const instance = axios.create({
  baseURL: server
})

export default instance

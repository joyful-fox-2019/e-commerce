import axios from 'axios'

// DEVELOPMENT
const server = 'http://localhost:3000'

// DEPLOY
// const server = 'http://bikelah.mardii.site'

const instance = axios.create({
  baseURL: server
})

export default instance

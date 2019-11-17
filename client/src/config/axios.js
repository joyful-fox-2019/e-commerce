import axios from 'axios'

const axiosServer = axios.create({
    baseURL: `http://localhost:3000`,
    headers: {
      "accesstoken": localStorage.getItem('token')
    }
})

export default axiosServer
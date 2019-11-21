import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'http://minipc-ecommerce.anggabanny.online' //DEPLOY
});

export default instance
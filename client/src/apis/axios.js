import axios from 'axios';

const server = axios.create({
    baseURL: 'http://ecommerce.server.edirates.xyz'
});

export default server;
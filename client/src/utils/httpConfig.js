import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:5001'
});

export default httpClient;
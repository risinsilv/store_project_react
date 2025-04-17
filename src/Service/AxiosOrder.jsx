import axios from 'axios';

const token = localStorage.getItem('token')

const instance = axios.create({
    baseURL: 'http://localhost:3000/store/user',
});

// Automatically update token for every request
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;


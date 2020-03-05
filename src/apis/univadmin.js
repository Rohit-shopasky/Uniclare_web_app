import axios from 'axios';
import { API } from './consts';
const getToken = () => {
    return localStorage.getItem("logtoken");
}

const http = axios.create({
    baseURL: API,
    headers: {
        'X-Auth-Origin': 'E-GOVERNANCE'
    }
});

http.interceptors.request.use(
    function (config) {
        const token = getToken();
        if (token) config.headers['X-Auth-Token'] = token;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default http;

import axios from "axios"

const endpoint = axios.create({
    baseURL: "http://localhost:8000/api"})

endpoint.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export const root = () => endpoint.get('/')

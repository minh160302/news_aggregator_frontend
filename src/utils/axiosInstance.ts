import axios from "axios";


const BASE_URL = "https://web-9aiae8u36ob8.up-de-fra1-k8s-1.apps.run-on-seenode.com";
// const BASE_URL = "http://127.0.0.1:8000";
// const BASE_URL = process.env.BASE_URL;

// Axios Interceptor Instance
const AxiosInstance = axios.create({
    baseURL: BASE_URL
});


// * Request Interceptor
// AxiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         const accessToken = JSON.parse(token);

//         // If token is present, add it to request's Authorization Header
//         if (accessToken) {
//             if (config.headers) config.headers.token = accessToken;
//         }
//         return config;
//     },
//     (error) => {
//         // Handle request errors here
//         return Promise.reject(error);
//     }
// );


// * Response Interceptor
AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default AxiosInstance;
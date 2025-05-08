import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
const axiosClient = axios.create({
    baseURL: "http://localhost:8007",
    headers: {
        'Content-Type': 'application/json',
    },
});
axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        

        return config;
    },
    (err: AxiosError) => {
        return Promise.reject(err);
    }
);
axiosClient.interceptors.response.use(
    async (response: AxiosResponse) => {
        return response;
    },

    async (err) => {
        if (err.response && err.response?.data) {
        } else {
            return Promise.reject(err);
        }
       
            return Promise.reject(err);
        
    }
);

export default axiosClient;

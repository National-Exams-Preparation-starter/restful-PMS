import axios, { AxiosInstance } from "axios";
import { Cookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_URL

const commonHeaders = {
    'Content-Type': 'application/json',
};

const cookies = new Cookies();


const unauthorizedAxiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: commonHeaders,
    withCredentials: true,
});

const authorizedAxiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        ...commonHeaders,
        Authorization: `Bearer ${cookies.get('accessToken')}`
    },
    withCredentials: true,
});

authorizedAxiosInstance.interceptors.request.use(
    async (config) => {
        const token = await cookies.get('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const unauthorizedAPI = unauthorizedAxiosInstance;
export const authorizedAPI = authorizedAxiosInstance;
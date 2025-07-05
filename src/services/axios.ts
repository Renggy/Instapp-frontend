import router from '@/router';
import axios from 'axios';

const axiosInstance = axios.create({

  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage atau Pinia store
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error)    => {
    switch (error.response.status) {
      case 401:router.push('/signin');    break;
      case 403: router.push('/');         break;
      case 500: alert('Something error'); break;
      default: break;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

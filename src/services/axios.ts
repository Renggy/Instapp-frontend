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
  (response) => response, // Langsung teruskan jika response sukses
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logika untuk handle 401, misalnya: redirect ke halaman login
      console.error('Unauthorized access - 401. Redirecting to login.');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

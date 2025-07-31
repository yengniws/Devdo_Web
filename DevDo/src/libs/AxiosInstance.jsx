import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
         config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      Promise.reject(error);
   },
);

export default axiosInstance;

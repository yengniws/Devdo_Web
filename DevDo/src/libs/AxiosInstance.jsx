import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
         config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      Promise.reject(error);
   },
);

axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         localStorage.removeItem('accessToken');
         window.location.href = '/login';
         return;
      }
      return Promise.reject(error);
   },
);
export default axiosInstance;

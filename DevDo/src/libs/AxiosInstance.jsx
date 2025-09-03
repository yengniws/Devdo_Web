import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
   withCredentials: true,
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

// 응답 인터셉터
axiosInstance.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      if (
         originalRequest.url.includes('/login/kakao') ||
         originalRequest.url.includes('/login')
      ) {
         return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;

         try {
            // refresh 요청 (쿠키 자동 전송됨)
            const res = await axios.post(
               `${import.meta.env.VITE_BASE_URL}/api/v1/login/refreshtoken`,
               {},
               { withCredentials: true },
            );

            const newAccessToken = res.data?.data; // 새 accessToken

            if (!newAccessToken) throw new Error('No new access token'); // 이거삭제

            // 새 accessToken 저장
            localStorage.setItem('accessToken', newAccessToken);

            // 헤더 갱신
            axiosInstance.defaults.headers.common['Authorization'] =
               `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] =
               `Bearer ${newAccessToken}`;

            // 실패했던 요청 재시도
            return axiosInstance(originalRequest);
         } catch (err) {
            console.log('❌ Refresh token 만료, 로그인 필요');
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            return Promise.reject(err);
         }
      }
      return Promise.reject(error);
   },
);

export default axiosInstance;

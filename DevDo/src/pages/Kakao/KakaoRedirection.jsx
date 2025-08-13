import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../libs/AxiosInstance';

const Redirection = () => {
   const navigate = useNavigate();
   const code = new URL(document.location.toString()).searchParams.get('code');

   useEffect(() => {
      axiosInstance
         .get(`/api/v1/login/kakao?code=${code}`)
         .then((r) => {
            localStorage.setItem('accessToken', r.data.data);

            navigate('/');
         })

         .catch((err) => {
            alert('로그인 실패');
            console.error(err);
            navigate('/login');
         });
   }, []);

   return <div>로그인 중입니다.</div>;
};

export default Redirection;

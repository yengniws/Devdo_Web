import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Redirection = () => {
   const navigate = useNavigate();
   const code = new URL(document.location.toString()).searchParams.get('code');

   useEffect(() => {
      if (!code) {
         alert('인가 코드가 없습니다.');
         navigate('/login');
         return;
      }

      axios
         .get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/login/kakao?code=${code}`,
            {
               withCredentials: true,
            },
         )
         .then((r) => {
            console.log('token', r.data.data);
            localStorage.setItem('accessToken', r.data.data);

            navigate('/');
         })

         .catch((err) => {
            alert('로그인 실패');
            console.error(err);
            navigate('/login');
         });
   }, [code, navigate]);

   return <div>로그인 중입니다.</div>;
};

export default Redirection;

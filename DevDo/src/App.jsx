import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from 'react-responsive';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import CommunityList from './pages/Community/CommunityList';
import RoadmapDetail from './pages/RoadmapDetail/RoadmapDetail';
import MyPage from './pages/MyPage/MyPage';
import Layout from './components/Layout';
import KakaoRedirection from './pages/Login/Kakao/KakaoRedirection';
import GoogleRedirection from './pages/Login/Google/GoogleRedirection';
import CommunityListDetail from './pages/Community/CommunityListDetail';
import CommunityWrite from './pages/Community/CommunityWrite';
import ProfileDetail from './pages/ProfileDetail';
import {
   BrowserRouter as Router,
   Routes,
   Route,
   useLocation,
} from 'react-router-dom';
import RoadMap from './pages/RoadMap/RoadMap';
import StarBackground from './components/StarBackground';

function App() {
   const isDesktop = useMediaQuery({ minWidth: 1024 });
   const location = useLocation();
   const isRoadmapPage = location.pathname.startsWith('/roadmap');

   if (!isDesktop) {
      return (
         <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden bg-navy">
            <StarBackground />

            <p className="relative z-10 text-lg font-semibold text-neon-green">
               DevDo는 데스크탑으로 이용 가능해요!
            </p>
         </div>
      );
   }

   return (
      <div className="relative w-screen h-screen overflow-hidden">
         {isRoadmapPage && <StarBackground />}
         <Routes>
            <Route path="/oauth2/kakao" element={<KakaoRedirection />} />{' '}
            <Route path="/oauth2/google" element={<GoogleRedirection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/roadmap/:roadmapId" element={<RoadMap />} />
            <Route path="/roadmap" element={<RoadMap />} />
            <Route path="/roadmap/:id" element={<RoadMap />} />
            <Route element={<Layout />}>
               <Route path="/" element={<Dashboard />} />
               <Route path="/community" element={<CommunityList />} />
               <Route path="/community/:id" element={<CommunityListDetail />} />
               <Route path="/community/write" element={<CommunityWrite />} />
               <Route path="/community/edit/:id" element={<CommunityWrite />} />
               <Route path="/profile/:id" element={<ProfileDetail />} />
               <Route path="/roadmap/detail" element={<RoadmapDetail />} />
               <Route path="/roadmap/detail/:id" element={<RoadmapDetail />} />
               <Route path="/mypage" element={<MyPage />} />
            </Route>
         </Routes>

         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
         />
      </div>
   );
}

export default App;

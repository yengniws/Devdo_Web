import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login';
import CommunityList from './pages/Community/CommunityList';
import RoadmapDetail from './pages/RoadmapDetail/RoadmapDetail';
import MyPage from './pages/MyPage/MyPage';
import Layout from './components/Layout';
import Redirection from './pages/Kakao/KakaoRedirection';
import CommunityListDetail from './pages/Community/CommunityListDetail';
import CommunityWrite from './pages/Community/CommunityWrite';
import ProfileDetail from './pages/ProfileDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoadMap from './pages/RoadMap/RoadMap';

function App() {
   return (
      <>
         <Routes>
            <Route path="/oauth2/kakao" element={<Redirection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/roadmap" element={<RoadMap />} />
            <Route path="/roadmap/:id" element={<RoadMap />} />
            <Route element={<Layout />}>
               <Route path="/" element={<Dashboard />} />
               <Route path="/community" element={<CommunityList />} />
               <Route path="/community/:id" element={<CommunityListDetail />} />
               <Route path="/community/write" element={<CommunityWrite />} />
               <Route path="/community/edit/:id" element={<CommunityWrite />} />
               <Route path="/profile" element={<ProfileDetail />} />
               <Route path="/roadmap/detail" element={<RoadmapDetail />} />
               <Route path="/roadmap/detail/:id" element={<RoadmapDetail />} />
               <Route path="/mypage" element={<MyPage />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;

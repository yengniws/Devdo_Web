import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CommunityList from './pages/Community/CommunityList';
import Layout from './components/Layout';
import CommunityListDetail from './pages/Community/CommunityListDetail';
import CommunityWrite from './pages/Community/CommunityWrite';
import ProfileDetail from './pages/ProfileDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
   return (
      <>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
               <Route path="/" element={<Dashboard />} />
               <Route path="/community" element={<CommunityList />} />
               <Route path="/community/:id" element={<CommunityListDetail />} />
               <Route path="/community/write" element={<CommunityWrite />} />
               <Route path="/community/edit/:id" element={<CommunityWrite />} />
               <Route path="/profile" element={<ProfileDetail />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;

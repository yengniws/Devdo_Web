import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CommunityList from './pages/Community/CommunityList';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
   return (
      <>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
               <Route path="/" element={<Dashboard />} />
               <Route path="/community" element={<CommunityList />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;

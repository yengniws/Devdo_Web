import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Layout from './components/Layout';
import Redirection from './pages/Kakao/KakaoRedirection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
   return (
      <>
         <Routes>
            <Route path="/oauth2/kakao" element={<Redirection />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
               <Route path="/" element={<Dashboard />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;

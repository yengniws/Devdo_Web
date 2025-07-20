import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RoadmapDetail from './pages/RoadmapDetail';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
   return (
      <>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
               <Route path="/" element={<Dashboard />} />
               {/* <Route path="/roadmap/:id" element={<RoadmapDetail />} /> */}
               {/* 로드맵 개발 완료 후  위 코드(:id)로 수정 */}
               <Route path="/roadmap/detail" element={<RoadmapDetail />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;

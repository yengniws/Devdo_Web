import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
   return (
      <>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
               <Route path="/" element={<Dashboard />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;

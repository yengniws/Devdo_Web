import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
   return (
      <>
         {/* 전체 패딩 적용 */}
         <div className="h-screen w-screen bg-ivory flex flex-col overflow-hidden px-10 py-4">
            <Header />
            {/* // 헤더 높이 제외 */}
            <main className="h-[calc(100vh-80px)] w-full overflow-hidden">
               <Routes>
                  <Route path="/" element={<Dashboard />} />
               </Routes>
            </main>
         </div>
      </>
   );
}

export default App;

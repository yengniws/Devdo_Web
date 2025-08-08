import Header from './Header';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
   return (
      <div className="h-screen w-screen bg-ivory flex flex-col overflow-hidden px-10 py-4">
         <Header />
         <Navbar />
         <main className="h-[calc(100vh-80px)] w-full overflow-y-auto">
            <Outlet />
         </main>
      </div>
   );
};

export default Layout;

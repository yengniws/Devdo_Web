import Header from './Header';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
   return (
      <>
         <div className="min-h-screen w-screen bg-ivory flex flex-col px-10 py-4">
            <Header />
            <Navbar />
            <main className="flex-1 w-full overflow-y-auto">
               <Outlet />
            </main>
         </div>
      </>
   );
};

export default Layout;

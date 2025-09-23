import Header from './Header';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
   const location = useLocation();
   const { pathname } = location;

   const isDashboard = pathname === '/dashboard';
   const isCommunityList = pathname === '/community';

   const shouldDisableOverflow = isDashboard || isCommunityList;

   const mainClassName = `flex-1 w-full px-10 pb-4 ${
      shouldDisableOverflow ? '' : 'overflow-y-auto'
   }`;

   return (
      <div className="h-screen w-screen bg-ivory flex flex-col">
         <div className="px-10 pt-4">
            <Header />
            <Navbar />
         </div>
         <main className={mainClassName}>
            <Outlet />
         </main>
      </div>
   );
};

export default Layout;

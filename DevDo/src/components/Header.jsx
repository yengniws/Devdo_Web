import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
   const [isNavbarOpen, setIsNavbarOpen] = useState(false);

   if (window.location.pathname === '/login') return null;

   return (
      <>
         <header className="h-20 flex justify-between items-center bg-ivory px-8">
            <Link
               to="/dashboard"
               className="text-3xl font-semibold font-roboto-mono text-navy hover:cursor-pointer">
               DevDo
            </Link>
            <div className="flex items-center gap-10">
               <button onClick={() => setIsNavbarOpen(true)}>
                  <RxHamburgerMenu className="w-8 h-8 text-navy  hover:cursor-pointer" />
               </button>
               <Link to="/mypage">
                  <FaUserCircle className="w-9 h-9 text-navy hover:cursor-pointer" />
               </Link>
            </div>
         </header>

         {/* 네브바 삽입 */}
         <Navbar open={isNavbarOpen} setOpen={setIsNavbarOpen} />
      </>
   );
};

export default Header;

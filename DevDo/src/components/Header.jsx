import { FaUserCircle } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Header = () => {
   if (window.location.pathname === '/login') return null;

   return (
      <header className="h-20 flex justify-between items-center bg-ivory px-8">
         <Link
            to="/"
            className="text-3xl font-semibold font-roboto-mono text-navy">
            DevDo
         </Link>
         <div className="flex items-center gap-10">
            <Link to="/">
               <RxHamburgerMenu className="w-8 h-8 text-navy cursor-pointer" />
            </Link>
            <Link to="/">
               <FaUserCircle className="w-9 h-9 text-navy cursor-pointer" />
            </Link>
         </div>
      </header>
   );
};

export default Header;

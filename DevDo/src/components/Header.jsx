import { FaUserCircle } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Header = () => {
   return (
      <header className="py-[10px] flex justify-between items-center bg-ivory">
         <Link
            to="/"
            className="text-[33px] font-semibold font-roboto-mono text-navy "
         >
            DevDo
         </Link>

         <div className="flex items-center gap-10">
            <Link to="/">
               {' '}
               {/*링크 수정*/}
               <RxHamburgerMenu className="w-[33px] h-[33px] text-navy cursor-pointer" />
            </Link>
            <Link to="/">
               {' '}
               {/*링크 수정*/}
               <FaUserCircle className="w-[37px] h-[37px] text-navy cursor-pointer" />
            </Link>
         </div>
      </header>
   );
};

export default Header;

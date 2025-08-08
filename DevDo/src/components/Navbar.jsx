import { RxDashboard } from 'react-icons/rx';
import { PiChatTeardropDots } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ open, setOpen }) {
   const location = useLocation();
   const navigate = useNavigate();

   // 메뉴 정보 배열
   const menu = [
      {
         label: '대시보드',
         icon: <RxDashboard className="inline-block mr-2 size-6" />,
         path: '/',
      },
      {
         label: '커뮤니티',
         icon: <PiChatTeardropDots className="inline-block mr-2 size-7 " />,
         path: '/community', // 경로 수정 필요
      },
      {
         label: '마이페이지',
         icon: <GoPerson className="inline-block mr-2 size-7 " />,
         path: '/mypage',
      },
   ];

   return (
      <>
         <div
            className={`
                fixed inset-0 z-40 bg-black/10 backdrop-blur-sm
                transition-opacity duration-700
                ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
            onClick={() => setOpen(false)}
         />

         <nav
            className={`
          fixed top-0 right-0 z-50 h-screen w-[480px] bg-navy
          flex flex-col
          transition-transform duration-700
          ${open ? 'translate-x-0' : 'translate-x-full'}
          p-12
        `}
            style={{
               borderTopLeftRadius: '2rem',
               borderBottomLeftRadius: '2rem',
            }}>
            <div className="flex flex-col items-start mt-4">
               <span className="text-5xl font-extrabold text-ivory mb-6 ml-2 font-roboto-mono">
                  DevDo
               </span>
               <div className="border-b border-ivory w-full mb-15" />

               <ul className="flex flex-col gap-4 w-full">
                  {menu.map((item) => {
                     const isActive = location.pathname === item.path;
                     return (
                        <li
                           key={item.path}
                           className={`
                    text-2xl font-semibold pl-6 py-6 w-full text-left rounded-xl transition
                    flex items-center hover:cursor-pointer
                    ${
                       isActive
                          ? 'bg-ivory text-navy'
                          : 'text-white hover:bg-ivory hover:text-navy'
                    }
                  `}
                           onClick={() => {
                              setOpen(false);
                              navigate(item.path);
                           }}
                           style={{ cursor: 'pointer' }}>
                           {item.icon}
                           <div className="inline-block pl-2">{item.label}</div>
                        </li>
                     );
                  })}
               </ul>
            </div>

            <div className="mt-auto pl-2 text-gray-500 text-base font-normal">
               고객센터
               <br />
               help.devdo@gmail.com
            </div>
         </nav>
      </>
   );
}

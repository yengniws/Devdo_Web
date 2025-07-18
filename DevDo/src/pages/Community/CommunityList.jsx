import { IoIosSearch } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import DummyCommunity from '../../constants/DummyCommunity';
import { useState } from 'react';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';

const CommunityList = ({ community = DummyCommunity }) => {
   const [items] = useState(community);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

   return (
      <div className="flex flex-col justify-center w-full bg-ivory p-4 sm:p-8 md:p-12 lg:p-10">
         <div className="font-roboto-mono text-4xl font-bold text-navy">
            Community
            <div className="w-[100%] my-[1%] border-[1px] border-navy"></div>
         </div>
         <div className="w-[100%] h-[67px] relative flex bg-gray rounded-2xl text-2xl mt-4">
            <input
               type="text"
               placeholder="제목으로 글 찾기"
               className="w-[100%] pl-10 placeholder:text-2xl font-light"
            />
            <button className="absolute top-[6px] bottom-[6px] right-[20px] rounded-[15px] cursor-pointer">
               <IoIosSearch className="text-5xl" />
            </button>
         </div>

         <div className="flex flex-col mt-6 gap-2 font-pretendard p-3">
            {currentItems.map((community) => (
               <div key={community.id}>
                  <Link to={`/community/${community.id}`}>
                     <div className="w-ful p-4 flex justify-between items-center pb-2 pt-0">
                        <div className="flex flex-row ">
                           <div className="text-2xl font-normal mr-3">
                              {community.title}
                           </div>
                           <div className="text-xl text-neon-green font-normal">
                              [{community.comment}]
                           </div>
                        </div>
                        <div className="flex flex-row">
                           <div className="text-xl font-light mr-5">
                              {community.date}
                           </div>

                           <div className="flex items-center gap-1 font-light text-xl">
                              <IoEyeOutline />
                              <span>{community.view}</span>
                           </div>
                        </div>
                     </div>
                  </Link>
                  <div className="w-[100%] my-[1%] border-[1px] border-gray "></div>
               </div>
            ))}
         </div>

         <div className="flex justify-end mr-4 ">
            <Link to="/community/write">
               <button className="bg-neon-green w-25 h-10 rounded-xl text-lg cursor-pointer">
                  글쓰기
               </button>
            </Link>
         </div>
         <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={setCurrentPage}
         />
      </div>
   );
};

export default CommunityList;

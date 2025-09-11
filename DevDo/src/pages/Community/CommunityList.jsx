import { IoEyeOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import CommunityListSearch from '../../components/CommunityListSearch';
import axiosInstance from '../../libs/AxiosInstance';

const CommunityList = () => {
   const [data, setData] = useState([]);

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;

   const [searchTerm, setSearchTerm] = useState('');

   const onSearch = (term) => {
      setSearchTerm(term);
   };

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

   useEffect(() => {
      axiosInstance
         .get(`/api/v1/community`)
         .then((r) => {
            setData(r.data.data);
         })

         .catch((err) => {
            alert('불러오기 실패');
            console.error(err);
         });
   }, []);

   return (
      <div className="flex flex-col justify-center w-full bg-ivory p-4 sm:p-8 md:p-12 lg:p-10">
         <div className="font-roboto-mono text-4xl font-bold text-navy">
            Community
            <div className="w-[100%] my-[1%] border-[1px] border-navy"></div>
         </div>
         <div className="w-[100%] h-[67px] relative flex bg-gray rounded-2xl text-2xl mt-4">
            <CommunityListSearch searchTerm={searchTerm} onSearch={onSearch} />
         </div>

         {data && data.length > 0 ? (
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
                                 [{community.commentCount}]
                              </div>
                           </div>
                           <div className="flex flex-row">
                              <div className="text-xl font-light mr-5">
                                 {community.createdAt}
                              </div>

                              <div className="flex items-center gap-1 font-light text-xl">
                                 <IoEyeOutline />
                                 <span>{community.viewCount}</span>
                              </div>
                           </div>
                        </div>
                     </Link>
                     <div className="w-[100%] my-[1%] border-[1px] border-gray "></div>
                  </div>
               ))}
            </div>
         ) : (
            <span className="">검색 결과가 없습니다.</span>
         )}

         <div className="flex justify-end mr-4 ">
            <Link to="/community/write">
               <button className="bg-neon-green w-25 h-10 rounded-xl text-lg cursor-pointer">
                  글쓰기
               </button>
            </Link>
         </div>
         <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.length / itemsPerPage)}
            onPageChange={setCurrentPage}
         />
      </div>
   );
};

export default CommunityList;

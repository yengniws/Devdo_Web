import { IoEyeOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import CommunityListSearch from '../../components/CommunityListSearch';
import axiosInstance from '../../libs/AxiosInstance';
import { toast } from 'react-toastify';

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
      const fetchData = async () => {
         try {
            let url = `/api/v1/community`;
            if (searchTerm) {
               url = `/api/v1/community/search?keyword=${searchTerm}`;
            }
            const response = await axiosInstance.get(url);
            setData(response.data.data);
            setCurrentPage(1);
         } catch (err) {
            toast.error('불러오기 실패');
            console.error(err);
         }
      };
      fetchData();
   }, [searchTerm]);

   return (
      <div className="flex flex-col justify-center w-full bg-ivory p-2 sm:p-6 md:p-10 lg:p-8">
         <div className="font-roboto-mono text-4xl font-bold text-navy">
            Community
            <div className="w-[100%] my-[1%] border-[1px] border-navy"></div>
         </div>
         <div className="w-[100%] h-[49px] relative flex bg-gray rounded-2xl text-lg mt-2.5">
            <CommunityListSearch searchTerm={searchTerm} onSearch={onSearch} />
         </div>

         {data && data.length > 0 ? (
            <div className="flex flex-col mt-4 gap-1 font-pretendard p-1 text-black">
               {currentItems.map((community) => (
                  <div key={community.id}>
                     <Link to={`/community/${community.id}`}>
                        <div className="w-ful p-2 flex justify-between items-center pb-1 pt-0">
                           <div className="flex flex-row">
                              <div className="text-lg font-normal mr-1.5">
                                 {community.title}
                              </div>
                              <div className="text-sm text-neon-green font-normal">
                                 [{community.commentCount}]
                              </div>
                           </div>
                           <div className="flex flex-row">
                              <div className="text-sm font-light mr-3.5">
                                 {community.createdAt}
                              </div>

                              <div className="flex items-center gap-0.5 font-light text-sm">
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
            <span className="flex justify-center mt-7">
               검색 결과가 없습니다.
            </span>
         )}

         <div className="flex justify-end mr-2.5">
            <Link to="/community/write">
               <button className="bg-neon-green w-[75px] h-8 rounded-xl text-xs cursor-pointer text-ivory hover:text-navy">
                  글쓰기
               </button>
            </Link>
         </div>
         {data.length > 0 && (
            <div className="w-full flex justify-center py-1.5">
               <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(data.length / itemsPerPage)}
                  onPageChange={setCurrentPage}
               />
            </div>
         )}
      </div>
   );
};

export default CommunityList;

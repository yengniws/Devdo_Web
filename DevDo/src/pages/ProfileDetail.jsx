import { useState } from 'react';
import DummyCommunity from '../constants/DummyCommunity';
import { Link } from 'react-router-dom';
import { IoEyeOutline } from 'react-icons/io5';
import Pagination from '../components/Pagination';
import { FaUserCircle } from 'react-icons/fa';
import useModal from '../hooks/UseModal';
import ProfileCheckModal from '../components/Modal/ProfileCheck';

const ProfileDetail = ({ community = DummyCommunity }) => {
   const [items] = useState(community);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 5;
   const { openModal, closeModal } = useModal();

   const currentUser = {
      name: 'yeen parkk',
   };

   const userItems = items.filter((item) => item.writer === currentUser.name);
   const currentUserData = items.find(
      (item) => item.writer === currentUser.name,
   );

   const followerCount = currentUserData?.followers?.length ?? 0;
   const followingCount = currentUserData?.following?.length ?? 0;

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = userItems.slice(indexOfFirstItem, indexOfLastItem);

   return (
      <div className="flex flex-col justify-center w-full h-full bg-ivory p-4 sm:p-8 md:p-12 lg:p-10">
         <div className="flex flex-col bg-gray rounded-2xl w-full  h-full p-20">
            <div className="p-3">
               <div className="flex pt-0">
                  <div>
                     <FaUserCircle className="w-30 h-30 text-navy cursor-pointer" />
                  </div>
                  <div className="flex flex-col ml-4">
                     <div className="flex flex-row">
                        <div className="font-pretendard text-5xl font-bold text-navy tracking-wider">
                           {currentUser.name}
                        </div>{' '}
                        <button className="justify-center items-center bg-neon-green rounded-2xl w-26 font-pretendard font-normal text-xl ml-4">
                           팔로우
                        </button>
                     </div>
                     <div className="flex flex-row mt-5 text-xl">
                        <div
                           className=" mr-7"
                           onClick={() => openModal('profile_check_modal')}>
                           팔로워 {followerCount}
                        </div>{' '}
                        <ProfileCheckModal
                           currentUserId={currentUser.id}
                           onclose={() => closeModal('profile_check_modal')}
                        />
                        <div>팔로잉 {followingCount}</div>
                     </div>
                  </div>
               </div>

               <div className="border-[1px] mt-10"></div>
            </div>
            <div className="flex flex-col mt-6 gap-2 font-pretendard p-3">
               {userItems.length === 0 ? (
                  <div className="text-center text-lg text-gray-500 mt-10">
                     작성한 글이 없습니다.
                  </div>
               ) : (
                  currentItems.map((community) => (
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
                        <div className="w-[100%] my-[1%] border-[1px] border-gray-300 "></div>
                     </div>
                  ))
               )}
            </div>
            <Pagination
               currentPage={currentPage}
               totalPages={Math.ceil(userItems.length / itemsPerPage)}
               onPageChange={setCurrentPage}
            />
         </div>
      </div>
   );
};

export default ProfileDetail;

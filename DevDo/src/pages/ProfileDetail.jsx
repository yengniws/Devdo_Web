import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoEyeOutline } from 'react-icons/io5';
import Pagination from '../components/Pagination';
import useModal from '../hooks/UseModal';
import ProfileFollower from '../components/Modal/ProfileFollower';
import ProfileFollowing from '../components/Modal/ProfileFollowing';
import axiosInstance from '../libs/AxiosInstance';
import FollowBtn from '../components/Follow/FollowBtn';

const ProfileDetail = () => {
   const { id } = useParams();
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 3;
   const { openModal, closeModal } = useModal();
   const [data, setData] = useState(null);

   useEffect(() => {
      axiosInstance
         .get(`/api/v1/community/profile?communityId=${id}`)
         .then((r) => {
            setData(r.data.data);
         })

         .catch((err) => {
            alert('불러오기 실패');
            console.error(err);
         });
   }, [id]);

   const userItems = data?.myCommunities ?? [];
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = userItems.slice(indexOfFirstItem, indexOfLastItem);

   return (
      <div className="flex flex-col justify-center w-full h-full bg-ivory p-4 sm:p-8 md:p-12 lg:p-10">
         {!data ? (
            <div className="text-center text-lg text-gray-500 mt-10">
               로딩중...
            </div>
         ) : (
            <div className="flex flex-col bg-gray rounded-2xl w-full  h-full p-20 text-black">
               <div className="p-3">
                  <div className="flex pt-0">
                     <div>
                        <img
                           src={data.profilePicture}
                           className="w-30 h-30 text-navy cursor-pointer rounded-full"
                        />
                     </div>
                     <div className="flex flex-col ml-4 ">
                        <div className="flex flex-row">
                           <div className="font-pretendard text-5xl font-bold text-navy tracking-wider">
                              {data.nickname}
                           </div>{' '}
                           {data.isMyProfile !== true && (
                              <FollowBtn
                                 memberId={data.memberId}
                                 isFollowing={data.isFollowing}
                                 onFollowChange={(updated) => {
                                    setData((prev) => ({
                                       ...prev,
                                       ...updated,
                                    }));
                                 }}
                              />
                           )}
                        </div>
                        <div className="flex flex-row mt-5 text-xl">
                           <div
                              className=" mr-7 cursor-pointer"
                              onClick={() =>
                                 openModal('profile_follower_modal')
                              }>
                              팔로워 {data.followerCount}
                           </div>{' '}
                           <ProfileFollower
                              memberId={data?.memberId}
                              onClose={() =>
                                 closeModal('profile_follower_modal')
                              }
                           />
                           <div
                              className=" cursor-pointer"
                              onClick={() =>
                                 openModal('profile_following_modal')
                              }>
                              팔로잉 {data.followingCount}
                           </div>{' '}
                           <ProfileFollowing
                              memberId={data?.memberId}
                              onClose={() =>
                                 closeModal('profile_following_modal')
                              }
                           />
                        </div>
                     </div>
                  </div>

                  <div className="border-[1px] mt-10"></div>
               </div>
               <div className="flex flex-col mt-3 gap-2 font-pretendard p-3">
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
                           <div className="w-[100%] my-[1%] border-[1px] border-gray-300 "></div>
                        </div>
                     ))
                  )}
               </div>
               <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
                  <Pagination
                     currentPage={currentPage}
                     totalPages={Math.ceil(userItems.length / itemsPerPage)}
                     onPageChange={setCurrentPage}
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default ProfileDetail;

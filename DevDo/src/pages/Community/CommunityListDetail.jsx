import DummyCommunity from '../../constants/DummyCommunity';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { IoEyeOutline, IoBookmark } from 'react-icons/io5';
import { MdOutlineComment } from 'react-icons/md';
import { CiBookmark, CiMenuKebab } from 'react-icons/ci';
import CommunityEditModal from '../../components/Modal/CommunityEditModal';
import useModal from '../../hooks/UseModal';

const CommunityListDetail = ({ community = DummyCommunity }) => {
   const { id } = useParams();
   const list = community.find((item) => String(item.id) === id);
   const [isLikeClicked, setIsLikeClicked] = useState(false);
   const [isBookMarkClicked, setIsBookMarkClicked] = useState(false);
   const { openModal, closeModal } = useModal();

   const handleLikeClick = () => {
      setIsLikeClicked(!isLikeClicked);
   };

   const handleBookMarkClick = () => {
      setIsBookMarkClicked(!isBookMarkClicked);
   };

   // 백 연동 시 변경
   const currentUser = {
      name: 'rayoon yang',
   };

   return (
      <div className="flex flex-col justify-center w-full bg-ivory p-4 sm:p-8 md:p-12 lg:p-10">
         <div className="font-roboto-mono text-4xl font-bold text-navy">
            Community
            <div className="w-[100%] my-[1%] border-[1px] border-navy"></div>
         </div>
         <div className=" flex flex-col border border-gray-200 rounded-4xl w-full mt-4">
            <div className="flex justify-end mt-5 mr-5">
               <button
                  onClick={handleBookMarkClick}
                  className="flex flex-row justify-center text-md font-medium cursor-pointer mr-2 ">
                  {isBookMarkClicked ? (
                     <IoBookmark className="w-7 h-7" />
                  ) : (
                     <CiBookmark className="w-7 h-7 " />
                  )}
               </button>
               {list.writer === currentUser.name && (
                  <>
                     <button
                        className="cursor-pointer"
                        onClick={() => openModal('community_edit_modal')}>
                        <CiMenuKebab className="w-7 h-7 mr-2" />
                     </button>
                     <CommunityEditModal
                        id={list.id}
                        authorId={list.authorId}
                        currentUserId={currentUser.id}
                        onclose={() => closeModal('community_edit_modal')}
                     />
                  </>
               )}
            </div>
            <div className="px-15 pb-15 pt-3">
               <div className="flex flex-row pt-0">
                  <div>
                     <FaUserCircle className="w-13 h-13 text-navy cursor-pointer" />
                  </div>
                  <div>
                     <div className="font-pretendard text-2xl font-bold text-navy ml-3 tracking-wider">
                        {list.writer}
                     </div>
                     <div className="font-roboto-mono text-base font-extralight text-navy ml-3">
                        {list.detailDate}
                     </div>
                  </div>
               </div>
               <div className="mt-10 font-pretendard">
                  <div className=" font-bold text-3xl">{list.title}</div>
                  <div className="font-light mt-8 text-xl">{list.article}</div>
               </div>
               <div className="bg-gray w-22 h-10 p-2 mt-13 rounded-xl ">
                  <button
                     onClick={handleLikeClick}
                     className="flex flex-row justify-center text-md font-medium cursor-pointer ml-1 ">
                     {isLikeClicked ? (
                        <IoMdHeart className="w-5 h-5 pt-1" />
                     ) : (
                        <IoMdHeartEmpty className="w-5 h-5 pt-1" />
                     )}{' '}
                     좋아요
                  </button>
               </div>
               <div className="flex flex-row mt-8">
                  <div className="flex fle-row">
                     <IoEyeOutline className="w-6 h-6 mr-2" /> {list.view}
                  </div>
                  <div className="flex fle-row">
                     <IoMdHeartEmpty className="w-6 h-6 ml-2 mr-2" />{' '}
                     {list.like}
                  </div>
                  <div className="flex fle-row">
                     <MdOutlineComment className="w-6 h-6 ml-2 mr-2" />
                     {list.comment}
                  </div>
               </div>
            </div>
         </div>
         <div className="flex flex-row h-[67px] w-full text-2xl mt-4">
            <input
               type="text"
               placeholder="댓글을 입력하세요."
               className=" pl-10 placeholder:text-2xl bg-gray rounded-2xl font-light w-[100%] mr-5"
            />
            <button className="bg-neon-green p-3 rounded-2xl w-30 font-pretendard font-normal text-2xl">
               등록
            </button>
         </div>
      </div>
   );
};

export default CommunityListDetail;

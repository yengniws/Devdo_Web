import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import { MdOutlineComment } from 'react-icons/md';
import { CiMenuKebab } from 'react-icons/ci';
import CommunityEditModal from '../../components/Modal/CommunityEditModal';
import useModal from '../../hooks/UseModal';
import { useEffect } from 'react';
import axiosInstance from '../../libs/AxiosInstance';
import CommentInput from '../../components/Comment/CommentInput';
import LikeBtn from '../../components/Like/LikeBtn';
import ScrapBtn from '../../components/Scrap/ScrapBtn';

const CommunityListDetail = () => {
   const { id } = useParams();
   const { openModal, closeModal } = useModal();
   const [data, setData] = useState({});
   const [comments, setComments] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      axiosInstance
         .get(`/api/v1/community/detail?communityId=${id}`)
         .then((r) => {
            setData(r.data.data);
         })

         .catch((err) => {
            alert('불러오기 실패');
            console.error(err);
         });
   }, []);

   const fetchComments = async () => {
      try {
         const response = await axiosInstance.get(
            `/api/v1/comment/all?communityId=${id}`,
         );
         setComments(response.data.data.commentInfoResDtos);
      } catch (err) {
         console.error('댓글 불러오기 실패', err);
      }
   };

   useEffect(() => {
      fetchComments();
   }, [id]);

   return (
      <div className="flex flex-col justify-center w-full bg-ivory p-4 sm:p-8 md:p-12 lg:p-10">
         <div className="font-roboto-mono text-4xl font-bold text-navy">
            Community
            <div className="w-[100%] my-[1%] border-[1px] border-navy"></div>
         </div>
         <div className="flex flex-col border border-gray-200 rounded-4xl w-full mt-4">
            <div className="flex justify-end mt-5 mr-5">
               {Number(localStorage.getItem('memberId')) !== data.memberId && (
                  <ScrapBtn
                     communityId={data.id}
                     isScrapped={data.isScrapped}
                     onScrapChange={(updated) =>
                        setData((prev) => ({
                           ...prev,
                           isScrapped: updated.isScrapped,
                        }))
                     }
                  />
               )}
               {Number(localStorage.getItem('memberId')) === data.memberId && (
                  <>
                     <button
                        className="cursor-pointer"
                        onClick={() => openModal('community_edit_modal')}>
                        <CiMenuKebab className="w-7 h-7 mr-2" />
                     </button>
                     <CommunityEditModal
                        id={data.id}
                        authorId={data.authorId}
                        onclose={() => closeModal('community_edit_modal')}
                     />
                  </>
               )}
            </div>
            <div className="px-15 pb-5 pt-3 text-black">
               <div
                  className="flex flex-row pt-0"
                  onClick={() => navigate(`/profile/${id}`)}>
                  <div>
                     <img
                        src={data.pictureUrl}
                        alt="프로필"
                        className="w-13 h-13 text-navy cursor-pointer rounded-full"
                     />
                  </div>
                  <div>
                     <div className="font-pretendard text-2xl font-bold text-navy ml-3 tracking-wider">
                        {data.nickname}
                     </div>
                     <div className="font-roboto-mono text-base font-extralight text-navy ml-3">
                        {data.createdAt}
                     </div>
                  </div>
               </div>
               <div className="mt-10 font-pretendard">
                  <div className=" font-bold text-3xl">{data.title}</div>
                  <div className="font-light mt-8 text-xl">{data.content}</div>
               </div>
               <div className="mt-13">
                  <LikeBtn
                     communityId={data.id}
                     isLiked={data.isLiked}
                     onLikeChange={(updated) =>
                        setData((prev) => ({
                           ...prev,
                           isLiked: updated.isLiked,
                           viewLike: updated.viewLike,
                        }))
                     }
                  />
               </div>
               <div className="flex flex-row mt-8">
                  <div className="flex fle-row">
                     <IoEyeOutline className="w-6 h-6 mr-2" /> {data.viewCount}
                  </div>
                  <div className="flex fle-row">
                     <IoMdHeartEmpty className="w-6 h-6 ml-2 mr-2" />{' '}
                     {data.viewLike}
                  </div>
                  <div className="flex fle-row">
                     <MdOutlineComment className="w-6 h-6 ml-2 mr-2" />
                     {data.commentCount}
                  </div>
               </div>{' '}
               <div className="w-full pt-10 ">
                  <div className="mt-5">
                     {comments.map((comment) => (
                        <div key={comment.commentId}>
                           <div className="-mx-15  border-t border-gray-200 mt-5 mb-5"></div>
                           <div className="flex flex-row ">
                              <img
                                 src={comment.writerPictureUrl}
                                 className="w-9 h-9 text-navy cursor-pointer rounded-full"
                              />
                              <div className="text-navy font-semibold flex flex-row ml-3 items-center text-base">
                                 {comment.writerNickname}
                              </div>
                           </div>
                           <div className="text-navy text-base font-light mt-3">
                              {comment.content}
                           </div>
                           <div className="text-[#9F9F9F] text-xs mt-1">
                              {comment.commentCreatedAt}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>{' '}
         </div>
         <CommentInput
            communityId={data.id}
            onAddComment={(newComment) => {
               // 새 댓글 화면에 추가
               setComments((prev) => [...prev, newComment]);

               // 댓글 수 업데이트
               setData((prev) => ({
                  ...prev,
                  commentCount: newComment.commentCount,
               }));
            }}
         />
      </div>
   );
};

export default CommunityListDetail;

import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import axiosInstance from '../../libs/AxiosInstance';

const LikeBtn = ({ communityId, isLiked, onLikeChange }) => {
   const handleLike = async () => {
      try {
         let response;
         if (isLiked) {
            response = await axiosInstance.delete(
               `/api/v1/like?communityId=${communityId}`,
            );
         } else {
            response = await axiosInstance.post(
               `/api/v1/like?communityId=${communityId}`,
            );
         }
         onLikeChange(response.data.data);
      } catch (err) {
         console.error('좋아요 요청 실패:', err);
      }
   };

   return (
      <button
         onClick={handleLike}
         className="flex items-center justify-center gap-1 bg-gray w-21 h-10 p-2 rounded-xl text-sm cursor-pointer">
         {isLiked ? (
            <IoMdHeart className="w-4 h-4" />
         ) : (
            <IoMdHeartEmpty className="w-4 h-4" />
         )}
         좋아요
      </button>
   );
};

export default LikeBtn;

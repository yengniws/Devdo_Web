import axiosInstance from '../../libs/AxiosInstance';

const FollowBtn = ({ memberId, isFollowing, onFollowChange }) => {
   const handleFollowToggle = async () => {
      try {
         let response;
         if (isFollowing) {
            // 언팔로우
            response = await axiosInstance.delete(
               `/api/v1/unfollow?toMemberId=${memberId}`,
            );
         } else {
            // 팔로우
            response = await axiosInstance.post(
               `/api/v1/follow?toMemberId=${memberId}`,
            );
         }

         const result = response.data?.data;
         onFollowChange(result || { isFollowing: !isFollowing });
      } catch (err) {
         console.error('팔로우/언팔로우 요청 실패:', err);
      }
   };

   return (
      <button
         className={`justify-center items-center rounded-2xl w-26 font-pretendard font-normal text-xl ml-4 cursor-pointer ${isFollowing ? 'bg-gray-400 text-white' : 'bg-neon-green text-navy'}`}
         onClick={handleFollowToggle}>
         {isFollowing ? '팔로잉' : '팔로우'}
      </button>
   );
};

export default FollowBtn;

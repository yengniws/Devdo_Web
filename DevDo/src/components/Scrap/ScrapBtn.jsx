import axiosInstance from '../../libs/AxiosInstance';
import { IoBookmark } from 'react-icons/io5';
import { CiBookmark } from 'react-icons/ci';

const ScrapBtn = ({ communityId, isScrapped, onScrapChange }) => {
   const handleScrap = async () => {
      try {
         let response;
         if (isScrapped) {
            response = await axiosInstance.delete(
               `/api/v1/community/scrap?communityId=${communityId}`,
            );
         } else {
            response = await axiosInstance.post(
               `/api/v1/community/scrap?communityId=${communityId}`,
            );
         }
         onScrapChange(response.data.data);
      } catch (err) {
         console.error('스크랩 요청 실패:', err);
      }
   };

   return (
      <button
         onClick={handleScrap}
         className="flex flex-row justify-center text-md font-medium cursor-pointer mr-2 ">
         {isScrapped ? (
            <IoBookmark className="w-7 h-7" />
         ) : (
            <CiBookmark className="w-7 h-7 " />
         )}
      </button>
   );
};

export default ScrapBtn;

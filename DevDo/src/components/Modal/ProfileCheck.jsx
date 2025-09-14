import { useState, useEffect } from 'react';
import axiosInstance from '../../libs/AxiosInstance';

const ProfileCheckModal = ({ memberId }) => {
   const [members, setMembers] = useState([]);

   useEffect(() => {
      if (!memberId) return;

      axiosInstance
         .get(`/api/v1/${memberId}/follower`)
         .then((r) => {
            setMembers(r.data.data.members || []);
         })

         .catch((err) => {
            alert('불러오기 실패');
            console.error(err);
         });
   }, [memberId]);

   return (
      <dialog id="profile_check_modal" className="modal">
         <div className="modal-box bg-ivory text-navy p-3 rounded-[20px] shadow-xl max-w-[300px] min-w-[300px] min-h-[350px] max-h-[350px] ">
            <div className="flex pt-5 pl-5 font-medium">팔로워</div>
            <div className=" border-navy border-[0.5px] mx-5 mt-3"></div>
            <div className="flex flex-col px-0 py-0">
               {members.length === 0 ? (
                  <div className="text-center mt-10 text-gray-500">
                     팔로워가 없습니다.
                  </div>
               ) : (
                  members?.map((member) => (
                     <div key={member.memberId} className="flex">
                        <div className="w-full py-5 px-6  bg-ivory transition-all flex gap-2">
                           <img src={member.pictureUrl} className="w-10 h-10" />
                           <div className="flex items-center text-2xl font-medium">
                              {member.nickname}
                           </div>
                        </div>{' '}
                        <div className="flex items-center justify-end pr-4 font-medium">
                           <button className=" bg-neon-green w-15 h-7 rounded-sm text-sm">
                              팔로우
                           </button>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>
         <form method="dialog" className="modal-backdrop">
            <button> close </button>
         </form>
      </dialog>
   );
};

export default ProfileCheckModal;

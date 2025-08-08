import { useState } from 'react';
import DummyCommunity from '../../constants/DummyCommunity';
import { FaUserCircle } from 'react-icons/fa';

const ProfileCheckModal = ({ follow = DummyCommunity }) => {
   const [items] = useState(follow);

   return (
      <dialog id="profile_check_modal" className="modal">
         <div className="modal-box bg-ivory text-navy p-3 rounded-[20px] shadow-xl min-w-[220px] max-w-[350px] ">
            <div className="flex pt-5 pl-5 font-medium">팔로워</div>
            <div className=" border-navy border-[0.5px] mx-5 mt-3"></div>
            <div className="flex flex-col px-0 py-0">
               {items.map((follow) =>
                  follow.followers?.map((follower, idx) => (
                     <div className="flex">
                        <div
                           key={`${follower.id}-${idx}`}
                           className="w-full py-5 px-6  bg-ivory transition-all flex gap-2">
                           <FaUserCircle className="w-10 h-10" />
                           <div className="flex items-center text-2xl font-medium">
                              {follower}
                           </div>
                        </div>{' '}
                        <div className="flex items-center justify-end pr-4 font-medium">
                           <button className=" bg-neon-green w-15 h-7 rounded-sm text-sm">
                              팔로우
                           </button>
                        </div>
                     </div>
                  )),
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

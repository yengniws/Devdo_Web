import { IoMdOpen } from 'react-icons/io';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const RoadmapDotModal = ({ idx }) => (
   <dialog id={`roadmap_dot_modal_${idx}`} className="modal">
      <div className="modal-box bg-ivory text-navy p-0 rounded-[20px] shadow-xl min-w-[220px] max-w-[240px]">
         <div className="flex flex-col items-center px-0 py-0">
            <button className="w-full py-5 px-6 text-base font-semibold border-b border-[#e5e5e5] rounded-t-[20px] bg-ivory hover:bg-[#f2f2f2] transition-all flex items-center justify-center gap-2">
               <IoMdOpen className="w-5 h-5 text-navy" />
               <div> 열기 </div>
            </button>
            <button className="w-full py-5 px-6 text-base font-semibold border-b border-[#e5e5e5] bg-ivory hover:bg-[#f2f2f2] transition-all flex items-center justify-center gap-2">
               <FiEdit2 className="w-5 h-5 text-navy" />
               <div> 이름 변경 </div>
            </button>
            <button className="w-full py-5 px-6 text-base font-semibold rounded-b-[20px] bg-ivory hover:bg-[#f2f2f2] transition-all flex items-center justify-center gap-2">
               <FiTrash2 className="w-5 h-5 text-red-500" />
               <div> 삭제하기 </div>
            </button>
         </div>
      </div>
      <form method="dialog" className="modal-backdrop">
         <button> close </button>
      </form>
   </dialog>
);

export default RoadmapDotModal;

import { IoMdOpen } from 'react-icons/io';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const RoadmapDotModal = ({
   idx,
   roadmapId,
   onClose,
   onEdit,
   onDelete,
   onOpen,
}) => {
   const actions = [
      {
         icon: <IoMdOpen className="w-5 h-5 text-navy" />,
         label: '열기',
         isFirst: true,
         onClick: () => {
            onOpen();
            onClose();
         },
      },
      {
         icon: <FiEdit2 className="w-5 h-5 text-navy" />,
         label: '이름 변경',
         onClick: () => {
            onEdit();
         },
      },
      {
         icon: <FiTrash2 className="w-5 h-5 text-red-500" />,
         label: '삭제하기',
         isLast: true,
         onClick: () => {
            onDelete(roadmapId);
            onClose();
         },
      },
   ];

   return (
      <dialog id={`roadmap_dot_modal_${idx}`} className="modal">
         <div className="modal-box bg-ivory text-navy p-4 rounded-[20px] shadow-xl min-w-[260px] max-w-[280px]">
            <div className="flex flex-col items-center">
               {actions.map((action, index) => (
                  <button
                     key={index}
                     onClick={action.onClick}
                     className={`
                        w-full py-5 px-6 text-base font-semibold bg-ivory hover:bg-gray transition-all flex items-center justify-center gap-2
                        ${action.isFirst ? 'rounded-t-[20px] border-b border-[#e5e5e5]' : ''}
                        ${!action.isFirst && !action.isLast ? 'border-b border-[#e5e5e5]' : ''}
                        ${action.isLast ? 'rounded-b-[20px]' : ''}
                     `}>
                     {action.icon}
                     <div>{action.label}</div>
                  </button>
               ))}
            </div>
         </div>
         <form method="dialog" className="modal-backdrop">
            <button />
         </form>
      </dialog>
   );
};

export default RoadmapDotModal;

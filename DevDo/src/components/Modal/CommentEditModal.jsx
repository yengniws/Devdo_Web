import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import axiosInstance from '../../libs/AxiosInstance';

const CommentEditModal = ({ id, onClose, onDeleteSuccess }) => {
   const deleteComment = async () => {
      try {
         const response = await axiosInstance.delete(
            `/api/v1/comment?commentId=${id}`,
         );
         alert('삭제되었습니다.');
         onDeleteSuccess?.(id, response.data.data.commentCount);
         onClose?.();
      } catch (err) {
         alert('삭제 실패');
         console.error(err);
      }
   };

   return (
      <dialog id={`comment_edit_modal_${id}`} className="modal">
         <div className="modal-box bg-ivory text-navy p-0 rounded-[20px] shadow-xl min-w-[220px] max-w-[240px]">
            <div className="flex flex-col items-center px-0 py-0">
               <button
                  className="w-full py-5 px-6 text-base font-semibold rounded-b-[20px] bg-ivory hover:bg-[#f2f2f2] transition-all flex items-center justify-center gap-2"
                  onClick={deleteComment}>
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
};

export default CommentEditModal;

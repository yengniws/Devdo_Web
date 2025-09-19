import axiosInstance from '../../libs/AxiosInstance';
import { useState } from 'react';

const CommentInput = ({ communityId, onAddComment }) => {
   const [text, setText] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!text.trim()) return;

      try {
         const response = await axiosInstance.post(
            `/api/v1/comment?communityId=${communityId}`,
            {
               content: text,
               parentCommentId: null,
            },
         );

         const newComment = {
            commentId: response.data.data.commentId,
            communityId: response.data.data.communityId,
            content: response.data.data.content,
            commentCreatedAt: response.data.data.commentCreatedAt,
            writerNickname: response.data.data.writerNickname,
            writerPictureUrl: response.data.data.writerPictureUrl,
            commentCount: response.data.data.commentCount,
         };

         if (onAddComment) {
            onAddComment(newComment);
         }

         setText('');
      } catch (err) {
         alert('댓글 작성 실패');
         console.error(err);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="flex flex-row h-[67px] w-full text-2xl mt-4 ">
            <input
               type="text"
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="댓글을 입력하세요."
               className=" pl-10 placeholder:text-2xl bg-gray rounded-2xl font-light w-[100%] mr-5 text-black"
            />
            <button className="bg-neon-green p-3 rounded-2xl w-30 font-pretendard font-normal text-2xl">
               등록
            </button>
         </div>
      </form>
   );
};

export default CommentInput;

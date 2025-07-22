import { FaRegHeart, FaRegCommentDots } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const WrittenPosts = ({ posts, totalPages, currentPage, setPage }) => {
   return (
      <div className="p-6 rounded-xl border border-dark-gray flex flex-col h-1/2">
         <div className="font-bold text-2xl mb-4">작성한 글</div>

         <div className="flex-grow min-h-[260px]">
            {posts.map((post) => (
               <div
                  key={post.id}
                  className="p-2 border-b border-dark-gray last:border-b-0 flex justify-between items-center">
                  <div>
                     <div className="font-semibold text-lg">{post.title}</div>
                     <div className="text-sm text-navy font-light">
                        {post.date}
                     </div>
                  </div>
                  <div className="flex items-center gap-5 text-sm text-darkgray">
                     <span className="flex items-center gap-1">
                        <FaRegEye /> {post.views.toLocaleString()}
                     </span>
                     <span className="flex items-center gap-1">
                        <FaRegHeart /> {post.likes}
                     </span>
                     <span className="flex items-center gap-1">
                        <FaRegCommentDots /> {post.comments}
                     </span>
                     {/* 모달 연결 */}
                     <IoEllipsisHorizontal className="cursor-pointer" />
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-2 flex justify-center gap-3 items-center">
            <button
               disabled={currentPage === 1}
               onClick={() => setPage((p) => Math.max(1, p - 1))}
               className="text-navy text-xl">
               <MdKeyboardArrowLeft size={24} className="cursor-pointer" />
            </button>
            <div className="flex gap-[6px]">
               {Array.from({ length: totalPages }).map((_, index) => (
                  <div
                     key={index}
                     className={`w-[8px] h-[8px] rounded-full ${index + 1 === currentPage ? 'bg-navy' : 'bg-gray-400'}`}
                  />
               ))}
            </div>
            <button
               disabled={currentPage === totalPages}
               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
               className="text-navy text-xl">
               <MdKeyboardArrowRight size={24} className="cursor-pointer" />
            </button>
         </div>
      </div>
   );
};

export default WrittenPosts;

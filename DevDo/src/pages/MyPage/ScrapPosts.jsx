// ScrapPosts.jsx
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ScrapPosts = ({
   posts = [],
   totalPages = 1,
   currentPage = 1,
   setPage,
}) => {
   const navigate = useNavigate();

   return (
      <div className="p-6 rounded-xl border border-dark-gray flex flex-col h-1/2">
         <div className="font-bold text-lg mb-4">스크랩한 글</div>

         <div className="flex-grow min-h-[140px]">
            {posts.length > 0 ? (
               posts.map((post) => (
                  <div
                     key={post.id}
                     onClick={() => navigate(`/community/${post.id}`)}
                     className="p-1.5 border-b border-dark-gray last:border-b-0 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition">
                     <div className="font-semibold text-sm">{post.title}</div>
                     <div className="text-xs text-gray-600 ml-2 line-clamp-2">
                        {post.content?.slice(0, 50) || '내용 없음'}...
                     </div>
                  </div>
               ))
            ) : (
               <div className="text-center text-gray-500 text-sm">
                  스크랩한 글이 없습니다.
               </div>
            )}
         </div>

         <div className="mt-2 flex justify-center gap-3 items-center">
            <button
               disabled={currentPage === 1}
               onClick={() => setPage((p) => Math.max(1, p - 1))}
               className="text-navy text-xl disabled:opacity-50">
               <MdKeyboardArrowLeft size={24} className="cursor-pointer" />
            </button>
            <div className="flex gap-[6px]">
               {Array.from({ length: totalPages }).map((_, index) => (
                  <div
                     key={index}
                     className={`w-[8px] h-[8px] rounded-full ${
                        index + 1 === currentPage ? 'bg-navy' : 'bg-gray-400'
                     }`}
                  />
               ))}
            </div>
            <button
               disabled={currentPage === totalPages}
               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
               className="text-navy text-xl disabled:opacity-50">
               <MdKeyboardArrowRight size={24} className="cursor-pointer" />
            </button>
         </div>
      </div>
   );
};

export default ScrapPosts;

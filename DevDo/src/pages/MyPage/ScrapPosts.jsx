import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const ScrapPosts = ({ posts, totalPages, currentPage, setPage }) => {
   return (
      <div className="p-6 rounded-xl border border-dark-gray flex flex-col h-1/2">
         <div className="font-bold text-2xl mb-4">스크랩한 글</div>

         <div className="flex-grow">
            {posts.map((post) => (
               <div
                  key={post.id}
                  className="p-3 border-b border-dark-gray last:border-b-0 flex justify-between items-center">
                  <div className="font-semibold text-lg">{post.title}</div>
                  <div className="text-lg text-dark-gray text-right font-midium">
                     {post.description}
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

export default ScrapPosts;

import { useState } from 'react';
import { writtenPosts, bookmarkedPosts } from '../../constants/DummyData';
import UserSection from './UserSection';
import WrittenPosts from './WrittenPosts';
import ScrapPosts from './ScrapPosts';

const POSTS_PER_PAGE = 4;

const MyPage = () => {
   const [nickname, setNickname] = useState('귀여운 오소리');
   const [isEditingName, setIsEditingName] = useState(false);
   const [writtenPage, setWrittenPage] = useState(1);
   const [scrapPage, setScrapPage] = useState(1);

   const totalWrittenPages = Math.ceil(writtenPosts.length / POSTS_PER_PAGE);
   const totalScrapPages = Math.ceil(bookmarkedPosts.length / POSTS_PER_PAGE);

   const currentWritten = writtenPosts.slice(
      (writtenPage - 1) * POSTS_PER_PAGE,
      writtenPage * POSTS_PER_PAGE,
   );

   const currentScrap = bookmarkedPosts.slice(
      (scrapPage - 1) * POSTS_PER_PAGE,
      scrapPage * POSTS_PER_PAGE,
   );

   return (
      <div className="flex justify-center px-[20px] py-[40px] bg-ivory h-full overflow-hidden text-navy font-Pretendard">
         <div className="w-[80%] h-[80vh] flex gap-6">
            <UserSection
               nickname={nickname}
               setNickname={setNickname}
               isEditingName={isEditingName}
               setIsEditingName={setIsEditingName}
            />
            <div className="flex flex-col gap-6 w-[70%] overflow-hidden">
               <WrittenPosts
                  posts={currentWritten}
                  totalPages={totalWrittenPages}
                  currentPage={writtenPage}
                  setPage={setWrittenPage}
               />
               <ScrapPosts
                  posts={currentScrap}
                  totalPages={totalScrapPages}
                  currentPage={scrapPage}
                  setPage={setScrapPage}
               />
            </div>
         </div>
      </div>
   );
};

export default MyPage;

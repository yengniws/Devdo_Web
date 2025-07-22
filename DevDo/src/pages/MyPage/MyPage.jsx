import { useState } from 'react';
import { writtenPosts, bookmarkedPosts } from '../../constants/DummyData';
import { FaEye, FaHeart, FaCommentDots, FaEdit } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const POSTS_PER_PAGE = 2;

const MyPage = () => {
   const loginMethod = 'google'; // 또는 'kakao'

   const [isEditingName, setIsEditingName] = useState(false);
   const [nickname, setNickname] = useState('멋쟁이사자');
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

   const handleNameSubmit = (e) => {
      e.preventDefault();
      setIsEditingName(false);
   };

   const renderPagination = (totalPages, currentPage, setPage) => (
      <div className="flex justify-center mt-4 gap-2 items-center">
         <button
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="text-navy text-xl">
            <MdKeyboardArrowLeft />
         </button>
         {Array.from({ length: totalPages }).map((_, i) => (
            <button
               key={i}
               className={`w-6 h-6 rounded-full ${
                  currentPage === i + 1
                     ? 'bg-navy text-white'
                     : 'bg-gray text-navy'
               } text-sm`}
               onClick={() => setPage(i + 1)}>
               {i + 1}
            </button>
         ))}
         <button
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="text-navy text-xl">
            <MdKeyboardArrowRight />
         </button>
      </div>
   );

   return (
      <div className="flex justify-center gap-6 px-[40px] py-[40px] bg-ivory h-screen overflow-y-hidden text-navy font-Pretendard ">
         {/* 왼쪽 유저 카드 */}
         <div className="w-[25%] rounded-xl border p-6 flex flex-col items-center shadow-sm shrink-0">
            {/* 이름 */}
            <div className="flex items-center gap-2 mb-4">
               {isEditingName ? (
                  <form onSubmit={handleNameSubmit}>
                     <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        onBlur={() => setIsEditingName(false)}
                        autoFocus
                        className="text-2xl font-bold outline-none border-none bg-transparent cursor-text text-center"
                     />
                  </form>
               ) : (
                  <>
                     <h1 className="text-2xl font-bold">{nickname}</h1>
                     <button onClick={() => setIsEditingName(true)}>
                        <FaEdit className="text-navy" />
                     </button>
                  </>
               )}
            </div>

            {/* 프로필 이미지 */}
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
               <svg
                  className="w-16 h-16 text-navy"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
               </svg>
            </div>

            {/* 팔로우 정보 */}
            <div className="flex gap-4 mt-4 text-sm">
               <span>
                  팔로잉 <b>255</b>
               </span>
               <span>
                  팔로워 <b>10</b>
               </span>
            </div>

            {/* 로그인 상태 */}
            <div className="mt-4">
               {loginMethod === 'google' ? (
                  <button className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-md bg-white">
                     <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="google"
                        className="w-5 h-5"
                     />
                     구글 로그인 중
                  </button>
               ) : (
                  <button className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-md bg-white">
                     <img
                        src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
                        alt="kakao"
                        className="w-5 h-5"
                     />
                     카카오 로그인 중
                  </button>
               )}
            </div>

            {/* 버튼 */}
            <div className="flex flex-col gap-2 mt-6 w-full">
               <button className="bg-navy text-white py-1 rounded-md">
                  로그아웃
               </button>
               <button className="border border-navy text-navy py-1 rounded-md">
                  회원 탈퇴
               </button>
            </div>
         </div>

         {/* 오른쪽 본문 */}
         <div className="flex flex-col gap-6 w-[55%] overflow-hidden">
            {/* 작성한 글 */}
            <div className=" p-6 rounded-xl border shadow-sm flex-grow">
               <h2 className="font-bold text-lg mb-4">작성한 글</h2>
               {currentWritten.map((post) => (
                  <div
                     key={post.id}
                     className="py-2 border-b last:border-b-0 flex justify-between items-center">
                     <div>
                        <div className="font-bold">{post.title}</div>
                        <div className="text-sm text-darkgray">{post.date}</div>
                     </div>
                     <div className="flex items-center gap-4 text-sm text-darkgray">
                        <span className="flex items-center gap-1">
                           <FaEye /> {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                           <FaHeart /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                           <FaCommentDots /> {post.comments}
                        </span>
                     </div>
                  </div>
               ))}
               {renderPagination(
                  totalWrittenPages,
                  writtenPage,
                  setWrittenPage,
               )}
            </div>

            {/* 스크랩한 글 */}
            <div className=" p-6 rounded-xl border shadow-sm flex-grow">
               <h2 className="font-bold text-lg mb-4">스크랩한 글</h2>
               {currentScrap.map((post) => (
                  <div key={post.id} className="py-2 border-b last:border-b-0">
                     <div className="font-bold">{post.title}</div>
                     <div className="text-sm text-darkgray">
                        {post.description}
                     </div>
                  </div>
               ))}
               {renderPagination(totalScrapPages, scrapPage, setScrapPage)}
            </div>
         </div>
      </div>
   );
};

export default MyPage;

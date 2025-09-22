import { useEffect, useState } from 'react';
import axiosInstance from '../../libs/AxiosInstance';
import UserSection from './UserSection';
import WrittenPosts from './WrittenPosts';
import ScrapPosts from './ScrapPosts';

const POSTS_PER_PAGE = 4;

const MyPage = () => {
   const [profile, setProfile] = useState(null);
   const [writtenPosts, setWrittenPosts] = useState([]);
   const [scrapPosts, setScrapPosts] = useState([]);
   const [writtenPage, setWrittenPage] = useState(1);
   const [scrapPage, setScrapPage] = useState(1);

   // 프로필 조회
   useEffect(() => {
      const fetchProfile = async () => {
         try {
            const res = await axiosInstance.get('/api/v1/mypage/profile');
            setProfile(res.data.data);
         } catch (err) {
            console.error('프로필 불러오기 실패:', err);
         }
      };
      fetchProfile();
   }, []);

   // 내가 작성한 글 조회
   useEffect(() => {
      const fetchWritten = async () => {
         try {
            const res = await axiosInstance.get('/api/v1/community/my');
            const sortedPosts = res.data.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
            setWrittenPosts(sortedPosts);
         } catch (err) {
            console.error('작성 글 불러오기 실패:', err);
         }
      };
      fetchWritten();
   }, []);

   // 스크랩 글 조회
   useEffect(() => {
      const fetchScrap = async () => {
         try {
            const res = await axiosInstance.get('/api/v1/community/scrap');
            setScrapPosts(res.data);
         } catch (err) {
            console.error('스크랩 글 불러오기 실패:', err);
         }
      };
      fetchScrap();
   }, []);

   const totalWrittenPages = Math.ceil(writtenPosts.length / POSTS_PER_PAGE);
   const totalScrapPages = Math.ceil(scrapPosts.length / POSTS_PER_PAGE);

   const currentWritten = writtenPosts.slice(
      (writtenPage - 1) * POSTS_PER_PAGE,
      writtenPage * POSTS_PER_PAGE,
   );

   const currentScrap = scrapPosts.slice(
      (scrapPage - 1) * POSTS_PER_PAGE,
      scrapPage * POSTS_PER_PAGE,
   );

   return (
      <div className="flex justify-center px-[20px] py-[40px] bg-ivory h-full overflow-hidden text-navy font-Pretendard">
         <div className="w-[85%] h-[75vh] flex gap-6">
            {profile && (
               <UserSection profile={profile} setProfile={setProfile} />
            )}
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

import { GoPencil } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../libs/AxiosInstance';
import { useState } from 'react';
import ProfileFollower from '../../components/Modal/ProfileFollower';
import ProfileFollowing from '../../components/Modal/ProfileFollowing';

const UserSection = ({ profile, setProfile }) => {
   const [isEditingName, setIsEditingName] = useState(false);
   const [nickname, setNickname] = useState(profile.nickname);
   const navigate = useNavigate();

   const handleNameSubmit = async (e) => {
      e.preventDefault();
      try {
         await axiosInstance.patch('/api/v1/mypage/profile', {
            nickname,
            pictureUrl: profile.pictureUrl,
         });
         setProfile((prev) => ({ ...prev, nickname }));
         setIsEditingName(false);
         toast.info('닉네임이 변경되었습니다.');
      } catch (err) {
         console.error('닉네임 수정 실패:', err);
      }
   };

   const handleLogout = () => {
      localStorage.removeItem('accessToken');
      toast.info('로그아웃 되었습니다.');
      navigate('/login');
   };

   const handleDelete = async () => {
      try {
         await axiosInstance.delete('/api/v1/mypage');
         localStorage.removeItem('accessToken');
         toast.info('회원 탈퇴 되었습니다.');
         navigate('/login');
      } catch (err) {
         console.error('회원 탈퇴 실패:', err);
      }
   };

   // 모달 열기
   const openFollowerModal = () => {
      const modal = document.getElementById('profile_follower_modal');
      modal?.showModal();
   };

   const openFollowingModal = () => {
      const modal = document.getElementById('profile_following_modal');
      modal?.showModal();
   };

   return (
      <div className="w-[30%] rounded-xl border border-dark-gray p-10 pt-20 flex flex-col items-center relative">
         {/* 닉네임 */}
         <div className="flex items-center gap-1 mt-2 w-full justify-center min-h-[56px]">
            {isEditingName ? (
               <form
                  onSubmit={handleNameSubmit}
                  className="w-full flex justify-center">
                  <input
                     type="text"
                     value={nickname}
                     onChange={(e) => setNickname(e.target.value)}
                     onBlur={handleNameSubmit}
                     autoFocus
                     className="text-2xl font-semibold outline-none border-none bg-transparent text-center tracking-widest w-full max-w-[200px]"
                  />
               </form>
            ) : (
               <div className="flex items-center justify-center gap-2 w-full max-w-[220px]">
                  <div className="text-2xl font-semibold tracking-widest text-center w-full">
                     {profile.nickname}
                  </div>
                  <button onClick={() => setIsEditingName(true)}>
                     <GoPencil className="w-5 h-5 text-navy" />
                  </button>
               </div>
            )}
         </div>

         {profile.pictureUrl ? (
            <img
               src={profile.pictureUrl}
               alt="profile"
               className="w-35 h-35 my-6 rounded-full object-cover"
            />
         ) : (
            <FaUserCircle className="w-30 h-35 my-6" />
         )}

         {/* 팔로잉/팔로워 버튼 */}
         <div className="flex gap-8 mt-1 text-lg">
            <div className="cursor-pointer" onClick={openFollowingModal}>
               팔로잉 <b>{profile.followingCount}</b>
            </div>
            <div className="cursor-pointer" onClick={openFollowerModal}>
               팔로워 <b>{profile.followerCount}</b>
            </div>
         </div>

         <div className="mt-4">
            <button className="flex items-center gap-2 border border-navy px-10 py-2 rounded-md bg-white">
               {profile.socialType === 'GOOGLE' ? (
                  <>
                     <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        className="w-6 h-6"
                     />
                     구글 로그인 중
                  </>
               ) : (
                  <>
                     <img
                        src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
                        className="w-5 h-5"
                     />
                     카카오 로그인 중
                  </>
               )}
            </button>
         </div>

         <div className="flex flex-col gap-2 absolute bottom-6 right-6 w-[25%]">
            <button
               onClick={handleLogout}
               className="border border-navy py-[6px] text-xs rounded-full cursor-pointer">
               로그아웃
            </button>
            <button
               onClick={handleDelete}
               className="bg-navy border border-navy text-white py-[6px] text-xs rounded-full cursor-pointer">
               회원 탈퇴
            </button>
         </div>

         {/* 모달 컴포넌트 삽입 */}
         <ProfileFollower memberId={profile.memberId} />
         <ProfileFollowing memberId={profile.memberId} />
      </div>
   );
};

export default UserSection;

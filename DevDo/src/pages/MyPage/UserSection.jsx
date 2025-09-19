import { GoPencil } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';

const UserSection = ({
   nickname,
   setNickname,
   isEditingName,
   setIsEditingName,
}) => {
   const loginMethod = 'kakao'; // 또는 google

   const handleNameSubmit = (e) => {
      e.preventDefault();
      setIsEditingName(false);
   };

   return (
      <div className="w-[30%] rounded-xl border border-dark-gray p-10 pt-25 flex flex-col items-center relative">
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
                     onBlur={() => setIsEditingName(false)}
                     autoFocus
                     className="text-2xl font-semibold outline-none border-none bg-transparent text-center tracking-widest w-full max-w-[200px]"
                  />
               </form>
            ) : (
               <div className="flex items-center justify-center gap-2 w-full max-w-[220px]">
                  <div className="text-2xl font-semibold tracking-widest text-center w-full">
                     {nickname}
                  </div>
                  <button onClick={() => setIsEditingName(true)}>
                     <GoPencil className="w-5 h-5 text-navy" />
                  </button>
               </div>
            )}
         </div>

         <FaUserCircle className="w-30 h-35 my-6" />

         <div className="flex gap-8 mt-1 text-lg">
            <div>
               팔로잉 <b>255</b>
            </div>
            <div>
               팔로워 <b>10</b>
            </div>
         </div>

         <div className="mt-4">
            {loginMethod === 'google' ? (
               <button className="flex items-center gap-2 border border-navy px-10 py-2 rounded-md bg-white">
                  <img
                     src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                     className="w-6 h-6"
                  />
                  구글 로그인 중
               </button>
            ) : (
               <button className="flex items-center gap-2 border border-navy px-10 py-2 rounded-md bg-white">
                  <img
                     src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
                     className="w-5 h-5"
                  />
                  카카오 로그인 중
               </button>
            )}
         </div>

         <div className="flex flex-col gap-2 absolute bottom-6 right-6 w-[25%]">
            <button className="border border-navy py-[6px] text-xs rounded-full cursor-pointer">
               로그아웃
            </button>
            <button className="bg-navy border border-navy text-white py-[6px] text-xs rounded-full cursor-pointer">
               회원 탈퇴
            </button>
         </div>
      </div>
   );
};

export default UserSection;

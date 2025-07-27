import { PiFootprintsFill } from 'react-icons/pi';

const Login = () => {
   return (
      <div className="flex h-screen w-screen bg-navy">
         <div className="w-[38%] rounded-r-[200px] bg-ivory h-full flex flex-col justify-start text-navy inset-shadow-sm/100 pt-80 pl-13 max-lg:hidden max-sm:hidden">
            <PiFootprintsFill className="flex flex-col items-center text-9xl opacity-50 ml-58 leading-none -mb-10" />
            <div className="font-roboto-mono font-black text-8xl tracking-tighter">
               DevDo
            </div>
            <div>Developer + Todo</div>
            <div className="font-pretendard font-light text-2xl">
               당신의 여정을 그려줄 단 하나의 로드맵
            </div>
         </div>
         <div className="w-[62%] h-full flex flex-col justify-center items-center text-ivory max-lg:w-[100%] ">
            <div className="font-roboto-mono font-bold text-7xl mb-4">
               Welcome!
            </div>
            <div className="font-pretendard font-light text-lg mb-10">
               지금 로그인하여 DevDo를 만나보세요.
            </div>
            <button className="btn bg-[#FEE502] text-[#181600] w-sm h-13 mb-5 font-pretendard text-lg font-light">
               <svg
                  aria-label="Kakao logo"
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                     fill="#181600"
                     d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"></path>
               </svg>
               카카오 로그인
            </button>
            <button className="btn bg-white text-black w-sm h-13 font-pretendard text-lg font-light">
               <svg
                  aria-label="Google logo"
                  width="30"
                  height="30"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <g>
                     <path d="m0 0H512V512H0" fill="#fff"></path>
                     <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                     <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                     <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                     <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                  </g>
               </svg>
               구글 로그인
            </button>
         </div>
      </div>
   );
};
export default Login;

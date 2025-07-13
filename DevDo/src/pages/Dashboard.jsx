const Dashboard = () => {
   return (
      <div className="flex flex-col w-full py-[30px] px-[50px] pt-[50px] border-[1px] border-navy">
         <div className="text-[60px] font-semibold font-roboto-mono text-navy">
            🌱 Hi, There! USER:)
         </div>
         <div></div>
         <button className="w-[350px] px-8 py-4 rounded-full bg-[#B2FF99] text-ivory text-[25px] transition-all duration-300 block mx-auto hover:bg-neon-green hover:text-navy hover:opacity-100 ">
            + 로드맵 추가하기
         </button>
      </div>
   );
};
export default Dashboard;

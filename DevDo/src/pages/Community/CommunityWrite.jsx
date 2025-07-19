const CommunityWrite = () => {
   return (
      <div className="flex flex-col justify-center w-full bg-ivory p-4 sm:p-8 md:p-12 lg:p-10">
         <div className="font-roboto-mono text-4xl font-bold text-navy">
            Posting
            <div className="w-[100%] my-[1%] border-[1px] border-navy"></div>
         </div>
         <div className="w-[100%] h-[67px] relative flex bg-gray rounded-2xl text-2xl mt-4 font-light">
            <input
               type="text"
               placeholder="제목을 입력해주세요."
               className="w-[100%] pl-10 placeholder:text-2xl font-light"
            />
         </div>
         <div className=" flex flex-col border border-gray-200 rounded-4xl w-full h-[400px] mt-4 text-2xl font-light">
            <textarea
               type="text"
               placeholder="내용을 입력해주세요."
               className="w-[100%] h-[100%] pl-10 placeholder:text-2xl font-light pt-14 resize-none "
            />
         </div>
         <div className="flex justify-end mt-3">
            <button className=" bg-neon-green w-25 h-10 rounded-xl text-lg cursor-pointer">
               등록
            </button>
         </div>
      </div>
   );
};

export default CommunityWrite;

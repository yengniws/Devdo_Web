import { IoIosSearch } from 'react-icons/io';

const CommunityListSearch = ({ searchTerm, onSearch }) => {
   const handleInputChange = async (e) => {
      onSearch(e.target.value);
   };

   return (
      <>
         <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="제목으로 글 찾기"
            className="w-[100%] pl-10 placeholder:text-xl font-light rounded-[15px] text-black focus:outline-none caret-navy"
         />
         <button className="absolute top-[6px] bottom-[6px] right-[20px] rounded-[15px] cursor-pointer">
            <IoIosSearch className="text-3xl text-black" />
         </button>
      </>
   );
};

export default CommunityListSearch;

import { IoIosSearch } from 'react-icons/io';

const CommunityListSearch = ({ onSearch, searchTerm }) => {
   const handleInputChange = (event) => {
      const term = event.target.value;
      onSearch(term);
   };

   return (
      <>
         <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="제목으로 글 찾기"
            className="w-[100%] pl-10 placeholder:text-2xl font-light"
         />
         <button className="absolute top-[6px] bottom-[6px] right-[20px] rounded-[15px] cursor-pointer">
            <IoIosSearch className="text-5xl" />
         </button>
      </>
   );
};

export default CommunityListSearch;

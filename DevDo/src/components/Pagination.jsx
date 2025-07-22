const Pagination = ({ currentPage, totalPages, onPageChange }) => {
   const pageNumbers = [];

   for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
   }

   return (
      <div className="font-pretendard text-xl font-light flex justify-center  space-x-2">
         <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-navy cursor-pointer transition ${
               currentPage === 1 ? 'opacity-0 cursor-not-allowed' : ''
            }`}>
            이전
         </button>
         {pageNumbers.map((number) => (
            <button
               key={number}
               onClick={() => onPageChange(number)}
               className={`px-3 py-1  cursor-pointer ${
                  number === currentPage
                     ? ' text-navy border border-gray-300 rounded-sm'
                     : 'text-navy  transition'
               }`}>
               {number}
            </button>
         ))}
         <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg  cursor-pointer text-navy transition ${
               currentPage === totalPages ? 'opacity-0 cursor-not-allowed' : ''
            }`}>
            다음
         </button>
      </div>
   );
};

export default Pagination;

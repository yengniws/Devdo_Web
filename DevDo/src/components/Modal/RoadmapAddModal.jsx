const RoadmapAddModal = () => {
   const categories = [
      { label: 'Frontend', isFirst: true },
      { label: 'Backend' },
      { label: '협업' },
      { label: '신규 로드맵 추가', isLast: true },
   ];

   return (
      <dialog id="roadmap_modal" className="modal">
         <div className="modal-box bg-ivory text-navy p-0 rounded-[20px] shadow-xl min-w-[320px] max-w-[340px]">
            <div className="flex flex-col items-center px-0 py-0">
               {categories.map((cat, idx) => (
                  <button
                     key={idx}
                     className={`w-full py-5 px-6 text-base font-semibold bg-ivory hover:bg-gray transition-all
                    ${cat.isFirst ? 'rounded-t-[20px] border-b border-[#e5e5e5]' : ''}
                    ${!cat.isFirst && !cat.isLast ? 'border-b border-[#e5e5e5]' : ''}
                    ${cat.isLast ? 'rounded-b-[20px]' : ''}
                `}>
                     {cat.label}
                  </button>
               ))}
            </div>
         </div>
         <form method="dialog" className="modal-backdrop">
            <button />
            {/* 배경 누르면 모달 닫기 */}
         </form>
      </dialog>
   );
};

export default RoadmapAddModal;

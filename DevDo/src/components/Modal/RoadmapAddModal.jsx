import { useNavigate } from 'react-router-dom';

const RoadmapAddModal = ({ onAddNew }) => {
   const navigate = useNavigate();
   const categories = [
      { label: 'Frontend', path: '/roadmap/1', isFirst: true },
      { label: 'Backend', path: '/roadmap/4' },
      { label: '협업', path: '/roadmap/5' },
   ];

   return (
      <dialog id="roadmap_modal" className="modal">
         <div className="modal-box bg-ivory text-navy p-0 rounded-[20px] shadow-xl min-w-[320px] max-w-[340px]">
            <div className="flex flex-col items-center px-0 py-0">
               {categories.map((cat, idx) => (
                  <button
                     key={idx}
                     onClick={() => navigate(cat.path)}
                     className={`w-full py-5 px-6 text-base font-semibold bg-ivory hover:bg-gray transition-all
                        ${cat.isFirst ? 'rounded-t-[20px] border-b border-[#e5e5e5]' : ''}
                        ${!cat.isFirst ? 'border-b border-[#e5e5e5]' : ''}
                     `}>
                     {cat.label}
                  </button>
               ))}
               <button
                  onClick={onAddNew}
                  className="w-full py-5 px-6 text-base font-semibold bg-ivory hover:bg-gray transition-all rounded-b-[20px]">
                  신규 로드맵 추가
               </button>
            </div>
         </div>
         <form method="dialog" className="modal-backdrop">
            <button />
         </form>
      </dialog>
   );
};

export default RoadmapAddModal;

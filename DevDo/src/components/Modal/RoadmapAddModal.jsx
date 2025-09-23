import { useNavigate } from 'react-router-dom';

const RoadmapAddModal = ({ onAddRoadmap, items, closeModal }) => {
   const navigate = useNavigate();

   const frontend = items.find((r) => r.title.trim() === 'Frontend');
   const backend = items.find((r) => r.title.trim() === 'Backend');
   const coop = items.find((r) => r.title.trim() === '협업');

   const categories = [
      {
         label: 'Frontend',
         path: frontend ? `/roadmap/${frontend.roadmapId}` : null,
         isFirst: true,
      },
      {
         label: 'Backend',
         path: backend ? `/roadmap/${backend.roadmapId}` : null,
      },
      { label: '협업', path: coop ? `/roadmap/${coop.roadmapId}` : null },
      { label: '신규 로드맵 추가', path: 'new', isLast: true },
   ];

   return (
      <dialog id="roadmap_modal" className="modal">
         <div className="modal-box bg-ivory text-navy p-0 rounded-[20px] shadow-xl min-w-[320px] max-w-[340px]">
            <div className="flex flex-col items-center px-0 py-0">
               {categories.map((cat, idx) => (
                  <button
                     key={idx}
                     onClick={() => {
                        if (cat.path && cat.path !== 'new') {
                           closeModal('roadmap_modal');
                           navigate(cat.path);
                        } else if (cat.path === 'new') {
                           closeModal('roadmap_modal');
                           onAddRoadmap();
                        } else {
                           closeModal('roadmap_modal');
                           console.log(`${cat.label} 로드맵이 없습니다.`);
                        }
                     }}
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
         </form>
      </dialog>
   );
};

export default RoadmapAddModal;

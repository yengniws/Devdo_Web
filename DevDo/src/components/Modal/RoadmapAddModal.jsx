const RoadmapAddModal = () => (
   <dialog id="roadmap_modal" className="modal">
      <div className="modal-box bg-ivory text-navy p-0 rounded-[20px] shadow-xl min-w-[320px] max-w-[340px]">
         <div className="flex flex-col items-center px-0 py-0">
            <button className="w-full py-5 px-6 text-base font-semibold border-b border-[#e5e5e5] rounded-t-[20px] bg-ivory hover:bg-gray transition-all">
               Frontend
            </button>
            <button className="w-full py-5 px-6 text-base font-semibold border-b border-[#e5e5e5] bg-ivory hover:bg-gray transition-all">
               Backend
            </button>
            <button className="w-full py-5 px-6 text-base font-semibold border-b border-[#e5e5e5] bg-ivory hover:bg-gray transition-all">
               협업
            </button>
            <button className="w-full py-5 px-6 text-base font-semibold rounded-b-[20px] bg-ivory hover:bg-gray transition-all">
               신규 로드맵 추가
            </button>
         </div>
      </div>
      <form method="dialog" className="modal-backdrop">
         <button>close</button>
      </form>
   </dialog>
);

export default RoadmapAddModal;

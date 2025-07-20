import { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { HiOutlineBars2 } from 'react-icons/hi2';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DotMenuModal from '../../components/Modal/RoadmapDotModal';
import AddRoadmapModal from '../../components/Modal/RoadmapAddModal';
import EmptyRoadmapMessage from './EmptyRoadmapMessage';
import useModal from '../../hooks/UseModal';
import dummyRoadmaps from '../../constants/DummyData';
import LoadingPage from '../../components/LoadingPage';

const Dashboard = ({ roadmaps = dummyRoadmaps }) => {
   const [items, setItems] = useState(roadmaps);
   const [loading, setLoading] = useState(true);
   const { openModal, closeModal } = useModal();

   // 통신 작업 이후 로딩 로직 변경
   useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
   }, []);

   const onDragEnd = (result) => {
      if (!result.destination) return;
      const newItems = Array.from(items);
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);
      setItems(newItems);
   };

   if (loading) return <LoadingPage />;

   return (
      <div className="flex flex-col justify-center w-full bg-ivory p-4 sm:p-8 md:p-12 lg:p-10">
         <div className="text-[3.5vw] font-semibold font-roboto-mono text-navy my-[3vh]">
            🌱 Hi, There! USER:)
         </div>
         <div className="flex flex-col gap-5 bg-gray rounded-2xl p-8 w-full h-[64vh] min-h-[600px] max-h-[800px]">
            <DragDropContext onDragEnd={onDragEnd}>
               <Droppable droppableId="roadmap-list">
                  {(provided) => (
                     <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex-1 overflow-y-auto p-4 rounded-lg custom-scrollbar bg-gray"
                        style={{
                           scrollbarWidth: 'auto',
                           scrollbarColor: 'dark-gray ivory',
                        }}>
                        {items.length > 0 ? (
                           items.map((roadmap, idx) => (
                              <Draggable
                                 key={roadmap.id + '-' + idx}
                                 draggableId={String(roadmap.id) + '-' + idx}
                                 index={idx}>
                                 {(provided, snapshot) => (
                                    <div
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}
                                       className={`relative flex items-center px-6 py-5 bg-ivory rounded-lg shadow mb-5 last:mb-0 ${
                                          snapshot.isDragging
                                             ? 'ring-2 ring-neon-green'
                                             : ''
                                       }`}>
                                       <div className="flex items-center flex-1 min-w-0">
                                          <div
                                             {...provided.dragHandleProps}
                                             className="cursor-grab active:cursor-grabbing">
                                             <HiOutlineBars2 className="w-6 h-6 text-gray-400" />
                                          </div>
                                          <div className="text-xl text-neon-green ml-3 mr-1">
                                             📚
                                          </div>
                                          <div className="text-lg font-bold text-navy truncate font-roboto-mono">
                                             {roadmap.title}
                                          </div>
                                       </div>
                                       <div className="absolute left-1/2 -translate-x-1/2 text-sm text-dark-gray whitespace-nowrap">
                                          {roadmap.date}
                                       </div>
                                       <div className="flex-none ml-4">
                                          <button
                                             type="button"
                                             className="p-1 rounded-full hover:bg-dark-gray transition"
                                             onClick={() =>
                                                openModal(
                                                   `roadmap_dot_modal_${idx}`,
                                                )
                                             }>
                                             <FiMoreVertical className="w-6 h-6 text-gray-400 cursor-pointer" />
                                          </button>
                                          <DotMenuModal
                                             idx={idx}
                                             onClose={() =>
                                                closeModal(
                                                   `roadmap_dot_modal_${idx}`,
                                                )
                                             }
                                          />
                                       </div>
                                    </div>
                                 )}
                              </Draggable>
                           ))
                        ) : (
                           <EmptyRoadmapMessage />
                        )}
                        {provided.placeholder}
                     </div>
                  )}
               </Droppable>
            </DragDropContext>
            <button
               className="w-[21.875rem] px-8 py-4 rounded-full bg-neon-green text-ivory text-2xl font-pretendard font-semibold transition-all duration-300 mx-auto hover:text-navy hover:opacity-100 mt-4"
               onClick={() => openModal('roadmap_modal')}>
               + 로드맵 추가하기
            </button>
            <AddRoadmapModal />
         </div>
      </div>
   );
};

export default Dashboard;

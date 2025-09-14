import { useState, useEffect, useRef } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { HiOutlineBars2 } from 'react-icons/hi2';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DotMenuModal from '../../components/Modal/RoadmapDotModal';
import AddRoadmapModal from '../../components/Modal/RoadmapAddModal';
import EmptyRoadmapMessage from './EmptyRoadmapMessage';
import useModal from '../../hooks/UseModal';
import LoadingPage from '../../components/LoadingPage';
import axiosInstance from '../../libs/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [editingId, setEditingId] = useState(null);
   const [editingTitle, setEditingTitle] = useState('');
   const inputRef = useRef(null);
   const { openModal, closeModal } = useModal();
   const navigate = useNavigate();

   // 로드맵 목록 불러오기
   useEffect(() => {
      const fetchRoadmaps = async () => {
         try {
            const res = await axiosInstance.get('/api/roadmap/main');
            setItems(res.data);
         } catch (error) {
            console.error('로드맵 불러오기 실패:', error);
         } finally {
            setLoading(false);
         }
      };
      fetchRoadmaps();
   }, []);

   // input 포커스
   useEffect(() => {
      if (editingId && inputRef.current) {
         inputRef.current.focus();
      }
   }, [editingId]);

   const onDragEnd = (result) => {
      if (!result.destination) return;
      const newItems = Array.from(items);
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);
      setItems(newItems);
   };

   const handleUpdateTitle = async (roadmapId, newTitle) => {
      try {
         await axiosInstance.put(
            `/api/roadmap/title/${roadmapId}?newTitle=${encodeURIComponent(
               newTitle,
            )}`,
         );
         setItems((prev) =>
            prev.map((r) =>
               r.roadmapId === roadmapId ? { ...r, title: newTitle } : r,
            ),
         );
      } catch (error) {
         console.error('이름 변경 실패:', error);
      }
   };

   const handleDelete = async (roadmapId) => {
      try {
         await axiosInstance.delete(`/api/roadmap/${roadmapId}`);
         setItems((prev) => prev.filter((r) => r.roadmapId !== roadmapId));
      } catch (error) {
         console.error('삭제 실패:', error);
      }
   };

   if (loading) return <LoadingPage />;

   return (
      <div className="flex flex-col justify-center w-full bg-ivory p-4 sm:p-8 md:p-12 lg:p-10 font-pretendard">
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
                                 key={roadmap.roadmapId}
                                 draggableId={String(roadmap.roadmapId)}
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
                                          {editingId === roadmap.roadmapId ? (
                                             <input
                                                ref={inputRef}
                                                type="text"
                                                value={editingTitle}
                                                onChange={(e) =>
                                                   setEditingTitle(
                                                      e.target.value,
                                                   )
                                                }
                                                onKeyDown={(e) => {
                                                   if (e.key === 'Enter') {
                                                      if (
                                                         editingTitle.trim() &&
                                                         editingTitle !==
                                                            roadmap.title
                                                      ) {
                                                         handleUpdateTitle(
                                                            roadmap.roadmapId,
                                                            editingTitle,
                                                         );
                                                      }
                                                      setEditingId(null);
                                                   }
                                                }}
                                                onBlur={() => {
                                                   if (
                                                      editingTitle.trim() &&
                                                      editingTitle !==
                                                         roadmap.title
                                                   ) {
                                                      handleUpdateTitle(
                                                         roadmap.roadmapId,
                                                         editingTitle,
                                                      );
                                                   }
                                                   setEditingId(null);
                                                }}
                                                className="text-lg font-bold text-navy truncate font-roboto-mono bg-transparent border-b border-neon-green focus:outline-none"
                                             />
                                          ) : (
                                             <div
                                                className="text-lg font-bold text-navy truncate font-roboto-mono cursor-pointer"
                                                onClick={() =>
                                                   navigate(
                                                      `/roadmap/${roadmap.roadmapId}`,
                                                   )
                                                }>
                                                {roadmap.title}
                                             </div>
                                          )}
                                       </div>
                                       <div className="absolute left-1/2 -translate-x-1/2 text-sm text-dark-gray whitespace-nowrap">
                                          {new Date(
                                             roadmap.createdAt,
                                          ).toLocaleDateString()}
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
                                             roadmapId={roadmap.roadmapId}
                                             onClose={() =>
                                                closeModal(
                                                   `roadmap_dot_modal_${idx}`,
                                                )
                                             }
                                             onEdit={() => {
                                                setEditingId(roadmap.roadmapId);
                                                setEditingTitle(roadmap.title);
                                                closeModal(
                                                   `roadmap_dot_modal_${idx}`,
                                                );
                                             }}
                                             onDelete={handleDelete}
                                             onOpen={() =>
                                                navigate(
                                                   `/roadmap/${roadmap.roadmapId}`,
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

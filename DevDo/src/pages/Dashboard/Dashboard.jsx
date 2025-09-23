import { useState, useEffect, useRef, useCallback } from 'react';
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
import { toast } from 'react-toastify';

const Dashboard = () => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [editingId, setEditingId] = useState(null);
   const [editingTitle, setEditingTitle] = useState('');
   const [nickname, setNickname] = useState('');
   const inputRef = useRef(null);
   const { openModal, closeModal } = useModal();
   const navigate = useNavigate();

   const fetchRoadmaps = async () => {
      try {
         const res = await axiosInstance.get('/api/roadmap/main');
         setItems(res.data);
         return res.data;
      } catch (error) {
         console.error('로드맵 불러오기 실패:', error);
         return [];
      }
   };

   const createTemplateRoadmaps = useCallback(async (existingItems) => {
      const templates = ['Frontend', 'Backend', '협업'];
      const existingTitles = new Set(
         existingItems.map((item) => item.title.trim()),
      );
      const roadmapsToCreate = templates.filter(
         (title) => !existingTitles.has(title),
      );

      if (roadmapsToCreate.length === 0) {
         // console.log('기본 템플릿 로드맵이 이미 모두 존재합니다.');
         return;
      }

      try {
         for (const title of roadmapsToCreate) {
            await axiosInstance.post('/api/roadmap/template', {
               title: title,
               templateType: title,
            });
            // console.log(`${title} 템플릿 로드맵 생성 성공`);
         }
         await fetchRoadmaps();
      } catch (error) {
         console.error('템플릿 로드맵 생성 실패:', error);
         toast.error('기본 로드맵 생성에 실패했습니다.');
      }
   }, []);

   useEffect(() => {
      const initializeDashboard = async () => {
         setLoading(true);
         const fetchedItems = await fetchRoadmaps();
         await createTemplateRoadmaps(fetchedItems);
         setLoading(false);
      };
      initializeDashboard();
   }, [createTemplateRoadmaps]);

   useEffect(() => {
      const fetchNickname = async () => {
         try {
            const res = await axiosInstance.get('/api/v1/mypage/profile');
            setNickname(res.data.data.nickname || 'USER');
         } catch (error) {
            console.error('닉네임 불러오기 실패:', error);
            setNickname('USER');
         }
      };
      fetchNickname();
   }, []);

   useEffect(() => {
      if (editingId && inputRef.current) {
         inputRef.current.focus();
      }
   }, [editingId]);

   const updateRoadmapOrder = async (newOrder) => {
      try {
         await axiosInstance.put('/api/roadmap/reorder', {
            roadmapId: newOrder,
         });
      } catch (error) {
         console.error('로드맵 순서 업데이트 실패:', error);
      }
   };

   const onDragEnd = (result) => {
      if (!result.destination) return;
      const newItems = Array.from(items);
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);
      setItems(newItems);

      const newOrder = newItems.map((item) => item.roadmapId);
      updateRoadmapOrder(newOrder);
   };

   const handleUpdateTitle = async (roadmapId, newTitle) => {
      try {
         await axiosInstance.put(
            `/api/roadmap/title/${roadmapId}?newTitle=${encodeURIComponent(newTitle)}`,
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
      const roadmapToDelete = items.find((r) => r.roadmapId === roadmapId);

      if (
         ['Frontend', 'Backend', '협업'].includes(roadmapToDelete?.title.trim())
      ) {
         toast.error('기본 로드맵은 삭제할 수 없습니다.');
         closeModal(
            `roadmap_dot_modal_${items.findIndex((r) => r.roadmapId === roadmapId)}`,
         );
         return;
      }

      try {
         await axiosInstance.delete(`/api/roadmap/${roadmapId}`);
         setItems((prev) => prev.filter((r) => r.roadmapId !== roadmapId));
         toast.info('로드맵이 삭제되었습니다.');
      } catch (error) {
         console.error('삭제 실패:', error);
         toast.error('로드맵 삭제에 실패했습니다.');
      }
   };

   const handleAddRoadmap = async () => {
      try {
         await axiosInstance.post('/api/roadmap', {
            title: `Untitled${items.length + 1}`,
         });
         closeModal('roadmap_modal');
         await fetchRoadmaps();
         toast.info('새로운 로드맵이 생성되었습니다!');
      } catch (error) {
         console.error('로드맵 생성 실패:', error);
         toast.error('로드맵 생성에 실패했습니다.');
      }
   };

   if (loading) return <LoadingPage />;

   return (
      <div className="flex flex-col justify-center w-full bg-ivory p-8 sm:p-8 md:p-12 lg:p-10 font-pretendard">
         <div className="text-[3vw] font-semibold font-roboto-mono text-navy my-[3vh]">
            🌱 Hi, There! {nickname} :)
         </div>
         <div className="flex flex-col gap-5 bg-gray rounded-2xl p-6 w-full h-[60vh] min-h-[400px] max-h-[700px]">
            <DragDropContext onDragEnd={onDragEnd}>
               <Droppable droppableId="roadmap-list">
                  {(provided) => (
                     <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex-1 overflow-y-auto p-3 rounded-lg bg-gray"
                        style={{
                           scrollbarWidth: 'auto',
                           scrollbarColor: '#d3d3d3 ivory',
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
                                       className={`relative flex items-center px-5 py-4 bg-ivory rounded-lg shadow mb-3 last:mb-0 ${
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
                                                            roadmap.title &&
                                                         ![
                                                            'Frontend',
                                                            'Backend',
                                                            '협업',
                                                         ].includes(
                                                            roadmap.title.trim(),
                                                         )
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
                                                         roadmap.title &&
                                                      ![
                                                         'Frontend',
                                                         'Backend',
                                                         '협업',
                                                      ].includes(
                                                         roadmap.title.trim(),
                                                      )
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
                                          {roadmap.createdAt}
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
                                             roadmap={roadmap}
                                             setEditingId={setEditingId}
                                             setEditingTitle={setEditingTitle}
                                             closeModal={closeModal}
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
               className="w-[21.875rem] p-4 rounded-full bg-neon-green text-ivory text-xl font-pretendard font-semibold transition-all duration-300 mx-auto hover:text-navy hover:opacity-100 mt-4"
               onClick={() => openModal('roadmap_modal')}>
               + 로드맵 추가하기
            </button>

            <AddRoadmapModal
               onAddRoadmap={handleAddRoadmap}
               items={items}
               closeModal={closeModal}
            />
         </div>
      </div>
   );
};

export default Dashboard;

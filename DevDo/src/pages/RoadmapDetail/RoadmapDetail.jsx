import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import { AiOutlineClose } from 'react-icons/ai';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import axiosInstance from '../../libs/AxiosInstance';
import { debounce } from 'lodash';

// 이모지 처리
const getEmojiFromServer = (emojiData) => {
   if (!emojiData || emojiData.trim() === '') return '💻';

   const isEnglishName = /^[a-zA-Z_]+$/.test(emojiData.trim());

   if (isEnglishName) {
      const cleanName = emojiData.replace(/:/g, '');
      if (!Array.isArray(data.emojis)) return '💻';

      let foundEmoji = '💻';
      data.emojis.forEach((emoji) => {
         if (emoji.shortcodes?.includes(cleanName)) {
            foundEmoji = emoji.native;
         }
      });
      return foundEmoji;
   } else {
      return emojiData;
   }
};

const getEmojiForServer = (emoji) => {
   if (!emoji || emoji.trim() === '') return '💻';
   return emoji;
};

export default function RoadmapDetail() {
   const { nodeId } = useParams();
   const location = useLocation();
   const [loading, setLoading] = useState(true);
   const [selectedIcon, setSelectedIcon] = useState('💻');
   const [showAIBox, setShowAIBox] = useState(true);
   const [isPickerOpen, setIsPickerOpen] = useState(false);
   const [title, setTitle] = useState('');
   const [roadmapTitle, setRoadmapTitle] = useState('');
   const editor = useCreateBlockNote();
   const [aiLoading, setAiLoading] = useState(false);
   const [saveStatus, setSaveStatus] = useState(null);

   // 디바운스된 함수를 저장할 ref
   const debouncedSaveRef = useRef(null);

   const fetchNode = useCallback(async () => {
      setLoading(true);
      const nodeNameFromState = location.state?.nodeName;
      try {
         const res = await axiosInstance.get(
            `/api/v1/roadmap/node/detail/${nodeId}`,
         );
         const fetchedData = res.data.data;
         setTitle(nodeNameFromState || fetchedData.title || '');
         setRoadmapTitle(fetchedData.roadmapTitle || '');
         setSelectedIcon(getEmojiFromServer(fetchedData.emoji));

         if (fetchedData.content) {
            let blocks;
            try {
               blocks = await editor.tryParseMarkdownToBlocks(
                  fetchedData.content,
               );
               if (!blocks || blocks.length === 0) {
                  blocks = [
                     {
                        type: 'paragraph',
                        children: [{ text: fetchedData.content }],
                     },
                  ];
               }
            } catch {
               blocks = [
                  {
                     type: 'paragraph',
                     children: [{ text: fetchedData.content }],
                  },
               ];
            }
            editor.replaceBlocks(editor.document, blocks);
         }
      } catch (error) {
         console.error('로드맵 불러오기 실패:', error);
         setTitle(nodeNameFromState || '새로운 노드');
         setRoadmapTitle('');
      } finally {
         setLoading(false);
      }
   }, [nodeId, editor, location.state]);

   useEffect(() => {
      fetchNode();
   }, [fetchNode]);

   const saveNode = useCallback(async () => {
      const currentBlocks = editor.document;
      let newContent = '';

      try {
         newContent = await editor.blocksToMarkdownLossy(currentBlocks);
      } catch {
         try {
            newContent = currentBlocks
               .map((block) => {
                  if (block.content) {
                     return block.content.map((c) => c.text || '').join('');
                  }
                  if (block.children) {
                     return block.children.map((c) => c.text || '').join('');
                  }
                  return block.text || '';
               })
               .filter((text) => text.trim() !== '')
               .join('\n\n');
         } catch {
            newContent = '';
         }
      }

      // if (!newContent || newContent.trim() === '') {
      //    return;
      // }

      setSaveStatus('saving');
      const formData = new FormData();
      formData.append('content', newContent);
      formData.append('emoji', getEmojiForServer(selectedIcon));

      try {
         await axiosInstance.put(
            `/api/v1/roadmap/node/detail/${nodeId}`,
            formData,
            {
               headers: { 'Content-Type': 'multipart/form-data' },
            },
         );
         setSaveStatus('success');
      } catch (error) {
         console.error('노드 저장 실패', error);
         setSaveStatus('failure');
      }
   }, [editor, nodeId, selectedIcon]);

   // 컴포넌트 마운트 시 debounce된 함수 생성
   useEffect(() => {
      if (!debouncedSaveRef.current) {
         debouncedSaveRef.current = debounce(saveNode, 2000);
      }
      // 컴포넌트 언마운트 시 debounce 함수 취소
      return () => {
         if (debouncedSaveRef.current) {
            debouncedSaveRef.current.cancel();
         }
      };
   }, [saveNode]);

   // BlockNote 에디터 변경 감지
   useEffect(() => {
      const handleEditorChange = () => {
         if (debouncedSaveRef.current) {
            debouncedSaveRef.current();
         }
      };
      editor.onChange(handleEditorChange);

      return () => {
         // editor.destroy();
      };
   }, [editor]);

   // Ctrl + S 저장
   useEffect(() => {
      const handleKeyDown = (event) => {
         if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            saveNode();
         }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, [saveNode]);

   // 저장 상태에 따라 알림 표시 또는 숨기기
   useEffect(() => {
      if (saveStatus === 'success' || saveStatus === 'failure') {
         const timer = setTimeout(() => {
            setSaveStatus(null);
         }, 2000);
         return () => clearTimeout(timer);
      }
   }, [saveStatus]);

   const fetchAIText = async (queryType) => {
      setAiLoading(true);
      try {
         const res = await axiosInstance.post(
            `/api/v1/ai/roadmap/node/detail/${nodeId}?queryType=${queryType}`,
         );
         const newContent = res.data.data;
         if (newContent) {
            const blocks = await editor.tryParseMarkdownToBlocks(newContent);
            const lastBlock = editor.document[editor.document.length - 1];
            if (lastBlock) {
               editor.insertBlocks(blocks, lastBlock.id, 'after');
            } else {
               editor.insertBlocks(blocks, undefined, 'start');
            }
         }
      } catch (error) {
         console.error(`ai ${queryType} 호출 실패:`, error);
         alert('AI 호출 실패');
      } finally {
         setAiLoading(false);
      }
   };

   if (loading) return <LoadingPage />;

   return (
      <>
         <style>{`
        .custom-blocknote-theme {
          --bn-colors-editor-background: #FFFFF8;
          --bn-font-size: 16px;
        }
        .custom-blocknote-theme .bn-editor {
          background-color: #FFFFF8;
          border-radius: 0.75rem;
          min-height: 160px;
          font-weight: 600;
        }
        .custom-blocknote-theme .bn-block-content {
          font-size: 16px;
          font-weight: 600;
        }
        .title-input-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 42px;
          margin-bottom: 1.5rem;
          width: 100%;
        }
        .title-input {
          width: 100%;
          font-size: 3rem;
          font-weight: 700;
          color: #000;
          text-align: left;
          outline: none;
          border: none;
        }
      `}</style>
         {/* 저장 알림 */}
         {saveStatus === 'success' && (
            <div className="fixed top-13 left-1/2 -translate-x-1/2 text-gray-400 text-md z-50">
               저장되었습니다.
            </div>
         )}
         {saveStatus === 'failure' && (
            <div className="fixed top-5 left-1/2 -translate-x-1/2 text-gray-700 text-sm font-medium z-50">
               저장 실패
            </div>
         )}
         <div className="min-h-screen flex flex-col items-center pt-16 pr-[80px] font-pretendard">
            <div className="w-full max-w-4xl flex flex-col mb-2">
               {/* 이모지 버튼 */}
               <button
                  className="mb-2 w-25 h-25 flex items-center justify-center text-[64px] hover:bg-gray-100 ml-[42px] transition-colors duration-150"
                  onClick={() => setIsPickerOpen(true)}
                  type="button">
                  {selectedIcon}
               </button>
               <input
                  type="checkbox"
                  id="emoji-picker-modal"
                  className="modal-toggle"
                  checked={isPickerOpen}
                  onChange={() => setIsPickerOpen(!isPickerOpen)}
               />
               <label
                  htmlFor="emoji-picker-modal"
                  className="modal cursor-pointer flex justify-center items-center">
                  <div className="p-0 bg-transparent shadow-none rounded-none w-fit">
                     <Picker
                        data={data}
                        onEmojiSelect={(emoji) => {
                           setSelectedIcon(emoji.native);
                           setIsPickerOpen(false);
                        }}
                     />
                  </div>
               </label>

               {/* 제목 */}
               <div className="title-input-container">
                  <input
                     type="text"
                     value={title}
                     readOnly
                     className="title-input cursor-default"
                  />
               </div>

               {/* AI 추천 */}
               {showAIBox && (
                  <div className="bg-gray py-5 rounded-xl shadow-md w-30% text-left relative flex justify-center mb-5 ml-[42px]">
                     <button
                        onClick={() => setShowAIBox(false)}
                        className="absolute top-4 right-4 text-black hover:cursor-pointer"
                        aria-label="Close AI box">
                        <AiOutlineClose size={16} />
                     </button>
                     <div className="w-full max-w-2xl relative">
                        <div className="text-xl font-semibold mb-3 text-navy">
                           AI 추천
                        </div>
                        <div className="flex flex-col gap-[10px]">
                           {aiLoading ? (
                              <div className="text-center text-gray-500 py-4">
                                 AI가 답변을 생성 중입니다...
                              </div>
                           ) : (
                              <>
                                 <button
                                    className="w-full text-left bg-ivory px-3 py-[10px] rounded-lg shadow text-navy text-sm hover:bg-gray-50 transition"
                                    type="button"
                                    onClick={() => fetchAIText('lecture')}>
                                    {`✨ "${roadmapTitle} / ${title}" 관련 인터넷 강의를 추천해 줘.`}
                                 </button>
                                 <button
                                    className="w-full text-left bg-ivory px-3 py-[10px] rounded-lg shadow text-navy text-sm hover:bg-gray-50 transition"
                                    type="button"
                                    onClick={() => fetchAIText('article')}>
                                    {`☘️ "${roadmapTitle} / ${title}" 관련 개념을 설명해 주는 아티클 추천해 줘.`}
                                 </button>
                                 <button
                                    className="w-full text-left bg-ivory px-3 py-[10px] rounded-lg shadow text-navy text-sm hover:bg-gray-50 transition"
                                    type="button"
                                    onClick={() => fetchAIText('curriculum')}>
                                    {`🎁 "${roadmapTitle} / ${title}" 공부하기 좋은 커리큘럼을 작성해 줘.`}
                                 </button>
                              </>
                           )}
                        </div>
                     </div>
                  </div>
               )}

               {/* BlockNote */}
               <div className="custom-blocknote-theme">
                  <BlockNoteView
                     editor={editor}
                     theme="light"
                     style={{ outline: 'none', minHeight: '160px' }}
                  />
               </div>
            </div>
         </div>
      </>
   );
}

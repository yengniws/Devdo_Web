import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import { AiOutlineClose } from 'react-icons/ai';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import axiosInstance from '../../libs/AxiosInstance';
import emojiMap from '../../libs/EmojiMap';

export default function RoadmapDetail() {
   const { nodeId } = useParams();
   const [loading, setLoading] = useState(true);
   const [selectedIcon, setSelectedIcon] = useState('💻');
   const [showAIBox, setShowAIBox] = useState(true);
   const [isPickerOpen, setIsPickerOpen] = useState(false);
   const [title, setTitle] = useState('');
   const [pictureUrl, setPictureUrl] = useState('');
   const [content, setContent] = useState(''); // 마크다운 상태
   const editor = useCreateBlockNote();

   // GET 데이터 불러오기
   useEffect(() => {
      const fetchNode = async () => {
         const testNodeId = 21; // 예시 테스트용
         try {
            const res = await axiosInstance.get(
               `/api/v1/roadmap/node/detail/${testNodeId}`,
            );
            const data = res.data.data;

            setTitle(data.title || '');
            setSelectedIcon(emojiMap[data.emoji] || '💻');
            setPictureUrl(data.pictureUrl || '');
            setContent(data.content || '');

            // 📌 마크다운 → BlockNote 블록으로 변환 후 editor에 반영
            if (data.content) {
               const blocks = await editor.tryParseMarkdownToBlocks(
                  data.content,
               );
               editor.replaceBlocks(editor.document, blocks);
            }
         } catch (error) {
            console.error('로드맵 노드 불러오기 실패', error);
         } finally {
            setLoading(false);
         }
      };
      fetchNode();
   }, [editor]);

   // Ctrl+S 단축키 저장
   // Ctrl+S 단축키 저장
   useEffect(() => {
      const handleKeyDown = async (e) => {
         if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            try {
               await axiosInstance.put(
                  `/api/v1/roadmap/node/detail/${nodeId}`,
                  {
                     content, // 마크다운 그대로 전송
                     emoji:
                        Object.keys(emojiMap).find(
                           (key) => emojiMap[key] === selectedIcon,
                        ) || '💻',
                     pictureUrl,
                  },
               );
               console.log('저장 완료');
            } catch (error) {
               console.error('저장 실패', error);
            }
         }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, [selectedIcon, content, pictureUrl, nodeId]);

   if (loading) return <LoadingPage />;

   return (
      <>
         <style>{`
        .custom-blocknote-theme {
          --bn-colors-editor-background: #FFFFF8;
          --bn-font-size: 16px;
        }
        .custom-blocknote-theme .bn-editor {
          background-color: #FFFFF8 ;
          border-radius: 0.75rem;
          min-height: 160px;
          font-weight: 600 ;
        }
        .custom-blocknote-theme .bn-block-content {
          font-size: 16px ;
          font-weight: 600 ;
        }
      `}</style>

         <div className="min-h-screen flex flex-col items-center pt-16 pr-[80px] font-pretendard">
            <div className="w-full max-w-4xl  flex flex-col mb-2">
               <button
                  className="
               mb-2
               w-25 h-25
               flex items-center justify-center
               text-[64px]
               hover:bg-gray-100
               ml-[42px]
               transition-colors duration-150
            "
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

               {/* 제목 입력 */}
               <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-5xl font-bold text-black text-left mb-6 focus:outline-none ml-[42px]"
               />

               {/* AI 추천 박스 */}
               {showAIBox && (
                  <div className="bg-gray py-5 rounded-xl shadow-md w-30% text-left relative flex justify-center mb-5 ml-[42px]">
                     <button
                        onClick={() => setShowAIBox(false)}
                        className="absolute top-4 right-4 text-black hover:cursor-pointer"
                        aria-label="Close AI box">
                        <AiOutlineClose size={16} />
                     </button>
                     <div className="w-full max-w-2xl relative ">
                        <div className="text-xl font-semibold mb-3 text-navy">
                           AI 추천
                        </div>
                        <div className="flex flex-col gap-[10px]">
                           {[
                              '✨ ‘Frontend / 배포’ 관련 인터넷 강의를 추천해 줘.',
                              '☘️ ‘Frontend / 배포’ 관련 개념을 설명해 주는 아티클 추천해 줘.',
                              '🎁 ‘Frontend / 배포’ 공부하기 좋은 커리큘럼을 작성해 줘.',
                           ].map((text, idx) => (
                              <button
                                 key={idx}
                                 className="w-full text-left bg-ivory px-3 py-[10px] rounded-lg shadow text-navy text-sm hover:bg-gray-50 transition"
                                 type="button">
                                 {text}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               )}

               {/* BlockNoteView */}
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

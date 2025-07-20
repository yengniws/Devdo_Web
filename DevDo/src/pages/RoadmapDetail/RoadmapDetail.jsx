import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

export default function RoadmapDetail() {
   const [selectedIcon, setSelectedIcon] = useState('💻');
   const [showAIBox, setShowAIBox] = useState(true);
   const [isPickerOpen, setIsPickerOpen] = useState(false);
   const [title, setTitle] = useState('배포');
   const editor = useCreateBlockNote();

   return (
      <>
         <style>{`
        .custom-blocknote-theme {
          --bn-colors-editor-background: #FFFFF8;
          --bn-font-size: 20px;
        }
        .custom-blocknote-theme .bn-editor {
          background-color: #FFFFF8 ;
          border-radius: 0.75rem;
          min-height: 200px;
          font-weight: 600 ;
        }
        .custom-blocknote-theme .bn-block-content {
          font-size: 20px ;
          font-weight: 600 ;
        }
      `}</style>

         <div className="min-h-screen flex flex-col items-center pt-20 pr-[100px]">
            <div className="w-full max-w-4xl  flex flex-col mb-2">
               <button
                  className="
                     mb-2
                     w-25 h-25
                     flex items-center justify-center
                     text-[80px]
                     hover:bg-gray-100
                     ml-13
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
                  className="modal cursor-pointer flex justify-center items-center ">
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

               <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-6xl font-bold text-black text-left mb-8 focus:outline-none ml-13"
               />

               {showAIBox && (
                  <div className="bg-gray p-6 rounded-xl shadow-md w-70% text-left relative flex justify-center mb-6 ml-13">
                     <button
                        onClick={() => setShowAIBox(false)}
                        className="absolute top-5 right-5 text-black hover:cursor-pointer">
                        <AiOutlineClose size={20} />
                     </button>
                     <div className="w-full max-w-2xl relative ">
                        <div className="text-2xl font-semibold mb-4 text-navy">
                           AI 추천
                        </div>
                        <div className="flex flex-col gap-3">
                           {[
                              '✨ ‘Frontend / 배포’ 관련 인터넷 강의를 추천해 줘.',
                              '☘️ ‘Frontend / 배포’ 관련 개념을 설명해 주는 아티클 추천해 줘.',
                              '🎁 ‘Frontend / 배포’ 공부하기 좋은 커리큘럼을 작성해 줘.',
                           ].map((text, idx) => (
                              <button
                                 key={idx}
                                 className="w-full text-left bg-ivory px-4 py-3 rounded-lg shadow text-navy text-lg hover:bg-gray-50 transition"
                                 type="button">
                                 {text}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               )}
               <div className="custom-blocknote-theme">
                  <BlockNoteView
                     editor={editor}
                     theme="light"
                     style={{ outline: 'none', minHeight: '200px' }}
                  />
               </div>
            </div>
         </div>
      </>
   );
}

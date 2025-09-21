import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../libs/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CommunityWrite = () => {
   const { id } = useParams();
   const isEdit = Boolean(id);
   const navigate = useNavigate();

   const [board, setBoard] = useState({
      title: '',
      content: '',
   });

   useEffect(() => {
      if (isEdit) {
         axiosInstance
            .get(`/api/v1/community/detail?communityId=${id}`)
            .then((res) => {
               const data = res.data.data;
               setBoard({
                  title: data.title,
                  content: data.content,
               });
            })
            .catch((err) => console.error('게시글 불러오기 실패:', err));
      }
   }, [id, isEdit]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setBoard((prev) => ({ ...prev, [name]: value }));
   };

   const saveBoard = async () => {
      if (!board.title || !board.content) {
         toast.warn('제목과 내용을 모두 입력해주세요.');
         return;
      }

      try {
         if (isEdit) {
            await axiosInstance.put(
               `/api/v1/community?communityId=${id}`,
               board,
            );
            toast.success('게시글이 수정되었습니다.');
            navigate(`/community/${id}`);
         } else {
            await axiosInstance.post(`/api/v1/community`, board);
            toast.success('게시글이 등록되었습니다.');
            navigate('/community');
         }
      } catch (err) {
         toast.error('등록/수정 실패');
         console.error(err);
      }
   };

   return (
      <div className="flex flex-col justify-center w-full h-full bg-ivory p-4 sm:p-8 md:p-12 lg:p-10 text-navy">
         <div className="font-roboto-mono text-4xl font-bold text-navy">
            Posting
            <div className="w-full my-[1%] border-[1px] border-navy"></div>
         </div>
         <div className="w-full h-32 relative flex bg-gray rounded-2xl text-2xl mt-4 font-light">
            <input
               type="text"
               name="title"
               value={board.title}
               onChange={handleChange}
               placeholder="제목을 입력해주세요."
               className="w-[100%] pl-10 placeholder:text-2xl font-light rounded-2xl focus:outline-none caret-navy"
            />
         </div>
         <div className=" flex flex-col border border-gray-200 rounded-4xl w-full h-screen mt-4 text-2xl font-light">
            <textarea
               type="text"
               name="content"
               value={board.content}
               onChange={handleChange}
               placeholder="내용을 입력해주세요."
               className="w-full h-full pl-10 placeholder:text-2xl font-light pt-14 resize-none rounded-4xl focus:outline-none caret-navy"
            />
         </div>
         <div className="flex justify-end mt-3">
            <button
               className=" bg-neon-green w-25 h-10 rounded-xl text-lg cursor-pointer text-ivory hover:text-navy"
               onClick={saveBoard}>
               {isEdit ? '수정' : '등록'}
            </button>
         </div>
      </div>
   );
};

export default CommunityWrite;

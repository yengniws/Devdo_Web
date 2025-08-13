import React, { useState, useCallback, useEffect } from 'react';
import {
   ReactFlow,
   Controls,
   useNodesState,
   useEdgesState,
   addEdge,
} from '@xyflow/react';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '@xyflow/react/dist/style.css';

const initialNodes = [
   {
      id: '1',
      position: { x: 300, y: 100 },
      data: { label: 'Frontend' },
      style: {
         width: 80,
         height: 80,
         borderRadius: '50%',
         background: '#3EF900',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         color: '#222',
         fontWeight: 'bold',
         fontSize: 16,
         boxShadow: '0 0 20px 10px rgba(255,255,255,0.2)',
         transition: 'box-shadow 0.2s, border 0.2s',
         border: 'none',
      },
   },
   {
      id: '2',
      position: { x: 100, y: 250 },
      data: { label: 'html' },
      style: {
         width: 70,
         height: 70,
         borderRadius: '50%',
         background: '#D9D9D9',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         color: '#222',
         fontWeight: '500',
         boxShadow: '0 0 20px 10px rgba(255,255,255,0.2)',
         transition: 'box-shadow 0.2s, border 0.2s',
         border: 'none',
      },
   },
   {
      id: '3',
      position: { x: 500, y: 250 },
      data: { label: 'css' },
      style: {
         width: 70,
         height: 70,
         borderRadius: '50%',
         background: '#F46548',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         color: '#222',
         fontWeight: '500',
         boxShadow: '0 0 20px 10px rgba(255,255,255,0.2)',
         transition: 'box-shadow 0.2s, border 0.2s',
         border: 'none',
      },
   },
   {
      id: '4',
      position: { x: 300, y: 250 },
      data: { label: 'React' },
      style: {
         width: 70,
         height: 70,
         borderRadius: '50%',
         background: '#3EF900',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         color: '#222',
         fontWeight: '500',
         boxShadow: '0 0 20px 10px rgba(255,255,255,0.2)',
         transition: 'box-shadow 0.2s, border 0.2s',
         border: 'none',
      },
   },
];

const initialEdges = [
   { id: 'e1-2', source: '1', target: '2' },
   { id: 'e1-3', source: '1', target: '3' },
   { id: 'e1-4', source: '1', target: '4' },
];

let nodeId = 5;

const selectedNodeGlowStyle = {
   boxShadow: '0 0 20px 10px rgba(255,255,255,0.2)',
   zIndex: 4,
   border: '1.5px solid white',
};

const colorOptions = [
   { value: '#D9D9D9', label: 'White' },
   { value: '#3EF900', label: 'Green' },
   { value: '#F46548', label: 'Orange' },
];

const RoadMap = () => {
   const navigate = useNavigate();
   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const [selectedNode, setSelectedNode] = useState(null);
   const [nodeName, setNodeName] = useState('');
   const [lastSelectedNodeId, setLastSelectedNodeId] = useState(null);

   // 편집중 노드
   const editingNode = selectedNode
      ? nodes.find((node) => node.id === selectedNode.id)
      : null;

   // 사이드바 열릴 때마다 이름 동기화
   useEffect(() => {
      if (editingNode) setNodeName(editingNode.data.label);
   }, [editingNode?.id]);

   // 노드 더블 클릭: 사이드바 열기
   const onNodeDoubleClick = useCallback((_, node) => {
      setSelectedNode(node);
      setLastSelectedNodeId(node.id);
   }, []);

   // 노드 클릭: 선택 강조
   const onNodeClick = useCallback((_, node) => {
      setLastSelectedNodeId(node.id);
   }, []);

   // 노드 이름 저장, 차이가 있을 때만 반영
   const saveNodeName = () => {
      if (editingNode && nodeName !== editingNode.data.label) {
         setNodes((nds) =>
            nds.map((node) =>
               node.id === selectedNode.id
                  ? { ...node, data: { ...node.data, label: nodeName } }
                  : node,
            ),
         );
      }
   };

   // 사이드바 닫기: 저장 후 닫기
   const closeSidebar = () => {
      saveNodeName();
      setSelectedNode(null);
   };

   // 엔터/ESC에서 닫기
   const handleInputKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
         closeSidebar();
      }
   };

   // 노드 컬러 저장
   const updateNodeColor = (color) => {
      setNodes((nds) =>
         nds.map((node) =>
            node.id === selectedNode.id
               ? { ...node, style: { ...node.style, background: color } }
               : node,
         ),
      );
   };

   // 노드 추가
   const addNode = () => {
      const xy = nodes.length
         ? {
              x: nodes[nodes.length - 1].position.x + 80,
              y: nodes[nodes.length - 1].position.y + 70,
           }
         : { x: 300, y: 200 };
      setNodes((nds) => [
         ...nds,
         {
            id: String(nodeId++),
            position: xy,
            data: { label: `Node${nodeId - 1}` },
            style: {
               width: 70,
               height: 70,
               borderRadius: '50%',
               background: '#d9d9d9',
               color: '#222',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               fontWeight: 500,
               boxShadow: '0 0 20px 10px rgba(255,255,255,0.2)',
               transition: 'box-shadow 0.2s, border 0.2s',
               border: 'none',
            },
         },
      ]);
   };

   // 노드 삭제
   const deleteNode = () => {
      if (!lastSelectedNodeId) return;
      setNodes((nds) => nds.filter((node) => node.id !== lastSelectedNodeId));
      setEdges((eds) =>
         eds.filter(
            (e) =>
               e.source !== lastSelectedNodeId &&
               e.target !== lastSelectedNodeId,
         ),
      );
      setSelectedNode(null);
      setLastSelectedNodeId(null);
   };

   // 선택 효과
   const computedNodes = nodes.map((n) =>
      n.id === lastSelectedNodeId
         ? { ...n, style: { ...n.style, ...selectedNodeGlowStyle } }
         : n,
   );

   const currentColor =
      colorOptions.find(
         (o) =>
            (editingNode?.style?.background ?? '#D9D9D9').toLowerCase() ===
            o.value.toLowerCase(),
      )?.value || '#D9D9D9';

   return (
      <div className="w-screen h-screen min-h-screen bg-[#12203a] relative overflow-hidden">
         <div className="font-roboto-mono absolute top-6 left-6 z-50 text-3xl font-semibold text-white select-none">
            Frontend
         </div>
         <ReactFlow
            nodes={computedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDoubleClick={onNodeDoubleClick}
            onNodeClick={onNodeClick}
            onConnect={useCallback(
               (params) => setEdges((eds) => addEdge(params, eds)),
               [setEdges],
            )}
            fitView
            className="bg-transparent min-h-screen">
            <Controls
               showZoom={true}
               showFitView={true}
               showInteractive={true}
               style={{ color: 'navy' }}
            />
         </ReactFlow>
         {/* 노드 추가/삭제 버튼 바 */}
         <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-[1000] bg-[#253760] rounded-[20px] shadow-xl flex gap-6 items-center px-7 py-3">
            <button
               onClick={addNode}
               className="p-2 rounded-full hover:bg-emerald-600 transition text-white"
               title="노드 추가">
               <FiPlusCircle size={32} />
            </button>
            <button
               onClick={deleteNode}
               className={`p-2 rounded-full transition ${
                  lastSelectedNodeId
                     ? 'hover:bg-orange-600 text-white'
                     : 'bg-gray-600 text-gray-300 cursor-not-allowed'
               }`}
               disabled={!lastSelectedNodeId}
               title="노드 삭제">
               <FiTrash2 size={32} />
            </button>
         </div>

         {/* 사이드바 + 투명 오버레이 */}
         {selectedNode && (
            <>
               {/* 투명 오버레이. 클릭 시 닫기(자동저장) */}
               <div
                  className="fixed inset-0 bg-transparent z-[998]"
                  onClick={closeSidebar}
               />
               {editingNode && (
                  <div className="fixed top-0 right-0 h-full w-full max-w-[420px] p-10 z-[999] flex items-center justify-center pointer-events-auto">
                     <div
                        className="w-full bg-[#20305A] rounded-3xl min-h-[480px] flex flex-col items-stretch p-8 shadow-2xl border border-[#304175] relative"
                        onClick={(e) => e.stopPropagation()}>
                        <span className="text-2xl mb-8 font-mono font-semibold text-white">
                           Edit Node
                        </span>
                        {/* Node name */}
                        <label className="mb-2 text-sm font-mono text-white">
                           Node name
                        </label>
                        <input
                           type="text"
                           value={nodeName}
                           onChange={(e) => setNodeName(e.target.value)}
                           className="mb-6 p-3 rounded-lg bg-[#3a4971] placeholder-gray-400 text-gray-100 w-full font-mono text-base outline-none"
                           placeholder="React"
                           autoFocus
                           onKeyDown={handleInputKeyDown}
                        />
                        {/* Node Color */}
                        <label className="mb-2 text-sm font-mono text-white">
                           Node Color
                        </label>
                        <div className="mb-8 w-full relative flex items-center">
                           {/* 컬러 원 */}
                           <span
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-gray-400"
                              style={{ background: currentColor }}
                           />
                           <select
                              className="w-full appearance-none py-3 pl-12 pr-8 rounded-lg bg-[#3a4971] text-gray-100 font-mono text-base outline-none"
                              value={currentColor}
                              onChange={(e) => updateNodeColor(e.target.value)}>
                              {colorOptions.map((option) => (
                                 <option
                                    key={option.value}
                                    value={option.value}>
                                    {option.label}
                                 </option>
                              ))}
                           </select>
                           {/* 드롭다운 화살표 */}
                           <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                              <svg
                                 width="20"
                                 height="20"
                                 viewBox="0 0 24 24"
                                 fill="none">
                                 <path
                                    d="M7 10l5 5 5-5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                 />
                              </svg>
                           </span>
                        </div>
                        {/* 상세 페이지로 이동 버튼 */}
                        <button
                           className="mt-auto bg-[#94b9ff] hover:bg-[#7eaafc] text-blue-900 font-mono rounded-full py-3 w-full text-base font-semibold transition"
                           onClick={() => {
                              closeSidebar();
                              navigate('/roadmap/detail');
                           }}>
                           상세 페이지로 이동
                        </button>
                     </div>
                  </div>
               )}
            </>
         )}
      </div>
   );
};

export default RoadMap;

// 사이드바 애니메이션
// 리팩토링-노드 공통 코드 묶기, 페이지 분할
// 통신 밑작업

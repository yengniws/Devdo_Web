// RoadMap.js
import { useState, useCallback, useEffect, useRef } from 'react';
import {
   ReactFlow,
   Controls,
   useNodesState,
   useEdgesState,
   addEdge,
} from '@xyflow/react';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import axiosInstance from '../../libs/AxiosInstance';
import { getLayoutedElements } from '../../libs/layout';

const colorOptions = [
   { value: '#D9D9D9', label: 'White' },
   { value: '#3EF900', label: 'Green' },
   { value: '#F46548', label: 'Orange' },
];

// 노드 스타일 변환
const fromServerResponse = (apiNode) => {
   const colorMap = {
      RED: '#F46548',
      WHITE: '#D9D9D9',
      GREEN: '#3EF900',
   };
   return {
      id: String(apiNode.nodeId),
      data: { label: apiNode.nodeName },
      position: { x: 0, y: 0 },
      style: {
         width: 70,
         height: 70,
         // borderRadius: apiNode.nodeShape === 'CIRCLE' ? '50%' : '0%',
         borderRadius: '50%',
         background: colorMap[apiNode.nodeColor] || '#D9D9D9',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         color: '#000',
         fontWeight: '500',
         boxShadow: '0 0 20px 10px rgba(255,255,255,0.2)',
         transition: 'box-shadow 0.2s, border 0.2s',
         border: 'none',
      },
   };
};

const selectedNodeGlowStyle = {
   boxShadow: '0 0 20px 10px rgba(255,255,255,0.2)',
   zIndex: 4,
   border: '1.5px solid white',
};

let nodeId = 1;

const RoadMap = () => {
   const navigate = useNavigate();
   const { roadmapId } = useParams();
   const [nodes, setNodes, onNodesChange] = useNodesState([]);
   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
   const [selectedNode, setSelectedNode] = useState(null);
   const [nodeName, setNodeName] = useState('');
   const [lastSelectedNodeId, setLastSelectedNodeId] = useState(null);
   const [roadmapTitle, setRoadmapTitle] = useState('');

   // refs for 최신 nodes/edges 접근
   const nodesRef = useRef(nodes);
   useEffect(() => {
      nodesRef.current = nodes;
   }, [nodes]);

   const edgesRef = useRef(edges);
   useEffect(() => {
      edgesRef.current = edges;
   }, [edges]);

   // 색상 enum 변환
   const colorToEnum = (bg) => {
      if (!bg) return 'WHITE';
      const c = String(bg).toLowerCase();
      if (c.includes('#f46548')) return 'RED';
      if (c.includes('#3ef900')) return 'GREEN';
      return 'WHITE';
   };

   const buildNodePayload = (node, parentNodeId = null) => ({
      roadmapId: Number(roadmapId),
      nodeName: node?.data?.label ?? '',
      nodeShape: 'CIRCLE',
      nodeColor: colorToEnum(node?.style?.background),
      pictureUrl: node?.data?.pictureUrl ?? '',
      link: node?.data?.link ?? '',
      parentNodeId: parentNodeId === null ? null : Number(parentNodeId),
   });

   const fetchNodes = async () => {
      try {
         const res = await axiosInstance.get(`/api/roadmap/${roadmapId}`);
         const nodesData = res.data.nodes;

         const detailedNodes = await Promise.all(
            nodesData.map(async (node) => {
               const detailRes = await axiosInstance.get(
                  `/api/roadmap/node/${node.nodeId}`,
               );
               return {
                  ...node,
                  parentNodeId: detailRes.data.parentNodeId || null,
               };
            }),
         );

         const convertedNodes = detailedNodes.map((n) => fromServerResponse(n));

         const convertedEdges = detailedNodes
            .filter((n) => n.parentNodeId)
            .map((n) => ({
               id: `e${n.parentNodeId}-${n.nodeId}`,
               source: String(n.parentNodeId),
               target: String(n.nodeId),
            }));

         const { nodes: layoutedNodes, edges: layoutedEdges } =
            getLayoutedElements(convertedNodes, convertedEdges, 'TB');

         setNodes(layoutedNodes);
         setEdges(layoutedEdges);
         nodeId = layoutedNodes.length + 1;
         setRoadmapTitle(res.data.roadmapTitle || '');
      } catch (err) {
         console.error('노드 조회 실패', err);
      }
   };

   useEffect(() => {
      fetchNodes();
   }, [roadmapId]);

   // 노드 수정
   const editNode = async () => {
      if (!selectedNode) return;

      try {
         const detailRes = await axiosInstance.get(
            `/api/roadmap/node/${selectedNode.id}`,
         );
         const parentNodeId = detailRes.data.parentNodeId || null;

         const currentNode = nodes.find((n) => n.id === selectedNode.id);

         const payload = {
            ...buildNodePayload(currentNode, parentNodeId),
            nodeName: nodeName,
         };

         await axiosInstance.put(
            `/api/roadmap/node/${selectedNode.id}`,
            payload,
         );
         console.log('노드 수정 성공');
      } catch (err) {
         console.error('노드 수정 실패 ', err);
      }
   };

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

   // 사이드바 닫기: 저장 후 닫기
   const closeSidebar = async () => {
      await editNode();
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

   //노드 이름 저장
   const handleNodeNameChange = (e) => {
      const newName = e.target.value;
      setNodeName(newName);

      setNodes((nds) =>
         nds.map((n) =>
            n.id === selectedNode.id
               ? {
                    ...n,
                    data: { ...n.data, label: newName },
                 }
               : n,
         ),
      );
   };

   // 노드 추가
   const addNode = async () => {
      try {
         const newNodePayload = {
            roadmapId: Number(roadmapId),
            nodeName: `Node${nodeId}`,
            nodeShape: 'CIRCLE',
            nodeColor: 'WHITE',
            parentNodeId: null,
         };

         const res = await axiosInstance.post(
            '/api/roadmap/node',
            newNodePayload,
         );

         const apiNode = res.data;
         const newNode = fromServerResponse(apiNode);

         setNodes((nds) => [...nds, newNode]);
         nodeId++;
      } catch (err) {
         console.error('노드 추가 실패', err);
      }
   };

   // 노드 삭제
   const deleteNode = async () => {
      if (!lastSelectedNodeId) return;

      try {
         // 서버 삭제 요청
         await axiosInstance.delete(`/api/roadmap/node/${lastSelectedNodeId}`);

         // 로컬 상태 업데이트
         setNodes((nds) => nds.filter((n) => n.id !== lastSelectedNodeId));
         setEdges((eds) =>
            eds.filter(
               (e) =>
                  e.source !== lastSelectedNodeId &&
                  e.target !== lastSelectedNodeId,
            ),
         );

         console.log('노드 삭제 성공');
         setSelectedNode(null);
         setLastSelectedNodeId(null);
      } catch (err) {
         console.error('노드 삭제 실패', err);
      }
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

   // 부모 저장용 onConnect
   const handleConnect = useCallback(
      async (params) => {
         const { source, target } = params;
         const newEdgeId = `e${source}-${target}`;

         // 단일 부모 정책: target으로 들어오는 기존 edge 제거
         setEdges((eds) => {
            const withoutTarget = eds.filter((e) => e.target !== target);
            return addEdge(params, withoutTarget);
         });

         const childNode = nodesRef.current.find((n) => n.id === target);
         if (!childNode) return;

         const payload = {
            ...buildNodePayload(childNode),
            parentNodeId: Number(source),
         };

         try {
            await axiosInstance.put(`/api/roadmap/node/${target}`, payload);
            console.log('부모 저장 성공:', source, '→', target);
         } catch (err) {
            setEdges((eds) => eds.filter((e) => e.id !== newEdgeId));
            console.error('부모 저장 실패', err);
         }
      },
      [roadmapId],
   );

   // 부모 해제용 onEdgesChange
   const handleEdgesChange = useCallback(
      (changes) => {
         onEdgesChange(changes);
         const removedChanges = changes.filter((c) => c.type === 'remove');
         removedChanges.forEach(async (chg) => {
            const removedEdgeId = chg.id ?? chg.edge?.id;
            const removedEdge =
               edgesRef.current.find((e) => e.id === removedEdgeId) || null;
            if (!removedEdge) return;
            const target = removedEdge.target;
            const childNode = nodesRef.current.find((n) => n.id === target);
            if (!childNode) return;
            const payload = buildNodePayload(childNode, null);
            try {
               await axiosInstance.put(`/api/roadmap/node/${target}`, payload);
            } catch (err) {
               console.error('부모 해제 실패', err);
            }
         });
      },
      [onEdgesChange, roadmapId],
   );

   return (
      <div className="w-screen h-screen min-h-screen relative overflow-hidden">
         <div className="font-roboto-mono absolute top-6 left-6 z-50 text-3xl font-semibold text-white select-none">
            {roadmapTitle || 'RoadMap'}
         </div>
         <ReactFlow
            nodes={computedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={handleEdgesChange}
            onNodeDoubleClick={onNodeDoubleClick}
            onNodeClick={onNodeClick}
            onConnect={handleConnect}
            fitView
            className="bg-transparent min-h-screen">
            <Controls
               showZoom={true}
               showFitView={true}
               showInteractive={true}
               style={{ color: 'navy' }}
            />
         </ReactFlow>

         {/* 노드 추가/삭제 버튼 */}
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

         {/* 사이드바 */}
         {selectedNode && (
            <>
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
                        <label className="mb-2 text-sm font-mono text-white">
                           Node name
                        </label>
                        <input
                           type="text"
                           value={nodeName}
                           onChange={handleNodeNameChange}
                           className="mb-6 p-3 rounded-lg bg-[#3a4971] placeholder-gray-400 text-gray-100 w-full font-mono text-base outline-none"
                           placeholder="React"
                           autoFocus
                           onKeyDown={handleInputKeyDown}
                        />
                        <label className="mb-2 text-sm font-mono text-white">
                           Node Color
                        </label>
                        <div className="mb-8 w-full relative flex items-center">
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
                        <button
                           className="mt-auto bg-[#94b9ff] hover:bg-[#7eaafc] text-blue-900 font-mono rounded-full py-3 w-full text-base font-semibold transition"
                           onClick={async () => {
                              // 1. 필요한 데이터를 미리 변수에 저장
                              const nodeIdToNavigate = lastSelectedNodeId;
                              const nodeToNavigate = nodes.find(
                                 (n) => n.id === nodeIdToNavigate,
                              );
                              const nodeNameToNavigate =
                                 nodeToNavigate?.data?.label;

                              // 2. 사이드바를 닫아 상태를 초기화
                              await closeSidebar();

                              // 3. 저장된 데이터를 이용해 내비게이션
                              if (nodeIdToNavigate) {
                                 navigate(`/detail/${nodeIdToNavigate}`, {
                                    state: { nodeName: nodeNameToNavigate },
                                 });
                              } else {
                                 navigate('/dashboard');
                              }
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

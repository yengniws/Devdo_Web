import dagre from 'dagre';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 90;
const nodeHeight = 100;

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
   const isHorizontal = direction === 'LR';
   dagreGraph.setGraph({ rankdir: direction });

   nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
   });

   edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
   });

   dagre.layout(dagreGraph);

   const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? 'left' : 'top';
      node.sourcePosition = isHorizontal ? 'right' : 'bottom';

      return {
         ...node,
         position: {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
         },
      };
   });

   return { nodes: layoutedNodes, edges };
};

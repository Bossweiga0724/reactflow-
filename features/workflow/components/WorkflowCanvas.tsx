
import React, { useCallback, useRef, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  Panel,
  ReactFlowInstance,
  OnConnect,
} from 'reactflow';
import { useWorkflowStore } from '../store/workflow.store';
import { nodeRegistry } from '../core/registry';

// Fix: Cast sub-components to any to resolve external environment type pollution
// where Background, MiniMap, and Panel are incorrectly identified as incompatible or Vue VNode types.
const BackgroundComp = Background as any;
const ControlsComp = Controls as any;
const MiniMapComp = MiniMap as any;
const PanelComp = Panel as any;

export const WorkflowCanvas: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance | null>(null);

  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    selectNode,
    addNode 
  } = useWorkflowStore();

  const nodeTypes = useMemo(() => nodeRegistry.getNodeTypesMap(), []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      addNode(type, position);
    },
    [reactFlowInstance, addNode]
  );

  return (
    <div className="flex-1 relative bg-slate-50" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => selectNode(node.id)}
        onPaneClick={() => selectNode(null)}
        fitView
      >
        <BackgroundComp color="#cbd5e1" gap={20} />
        <ControlsComp />
        <MiniMapComp zoomable pannable style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
        
        <PanelComp position="top-right">
           <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-lg border border-slate-200 shadow-sm flex gap-2">
              <button 
                onClick={() => console.log('Saving...', useWorkflowStore.getState().getWorkflowData())}
                className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors"
              >
                Save Draft
              </button>
              <button 
                onClick={() => {
                  const blob = new Blob([JSON.stringify(useWorkflowStore.getState().getWorkflowData(), null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `workflow-${Date.now()}.json`;
                  a.click();
                }}
                className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded hover:bg-slate-50 transition-colors"
              >
                Export JSON
              </button>
           </div>
        </PanelComp>
      </ReactFlow>
    </div>
  );
};


import { create } from 'zustand';
import { 
  Connection, 
  Edge, 
  EdgeChange, 
  Node, 
  NodeChange, 
  addEdge, 
  applyEdgeChanges, 
  applyNodeChanges 
} from 'reactflow';
import { Workflow, WorkflowNode, WorkflowEdge } from '../core/model';

interface WorkflowState {
  id: string | null;
  name: string;
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  
  // Actions
  initWorkflow: (workflow: Workflow) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  selectNode: (id: string | null) => void;
  updateNodeData: (id: string, params: Record<string, any>) => void;
  addNode: (type: string, position: { x: number; y: number }) => void;
  removeNode: (id: string) => void;
  
  // Serialization
  getWorkflowData: () => Workflow;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  id: null,
  name: 'Untitled Workflow',
  nodes: [],
  edges: [],
  selectedNodeId: null,

  initWorkflow: (workflow) => {
    set({
      id: workflow.id,
      name: workflow.name,
      nodes: workflow.nodes.map(n => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: { ...n.data, id: n.id }
      })),
      edges: workflow.edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle,
        targetHandle: e.targetHandle,
      }))
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  selectNode: (id) => set({ selectedNodeId: id }),

  updateNodeData: (id, params) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              params: { ...node.data.params, ...params },
            },
          };
        }
        return node;
      }),
    });
  },

  addNode: (type, position) => {
    const id = `${type}_${Date.now()}`;
    const newNode: Node = {
      id,
      type,
      position,
      data: { 
        label: `${type.toUpperCase()} Node`, 
        params: {},
        id 
      },
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  removeNode: (id) => {
    set({
      nodes: get().nodes.filter(n => n.id !== id),
      edges: get().edges.filter(e => e.source !== id && e.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId
    });
  },

  getWorkflowData: () => {
    const { id, name, nodes, edges } = get();
    return {
      id: id || 'new',
      name,
      nodes: nodes.map(n => ({
        id: n.id,
        type: n.type!,
        position: n.position,
        data: {
          label: n.data.label,
          params: n.data.params
        }
      })),
      edges: edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle,
        targetHandle: e.targetHandle
      }))
    };
  }
}));

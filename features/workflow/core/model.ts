
export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  entry?: string;
}

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    params: Record<string, any>;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export type SchemaType = 'string' | 'number' | 'boolean' | 'select' | 'textarea' | 'json';

export interface PropertySchema {
  type: SchemaType;
  label: string;
  description?: string;
  options?: string[];
  required?: boolean;
  default?: any;
}

export interface NodeSchema {
  [key: string]: PropertySchema;
}

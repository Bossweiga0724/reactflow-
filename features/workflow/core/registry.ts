
import { ReactNode } from 'react';
import { NodeSchema } from './model';

export interface NodeDefinition {
  type: string;
  title: string;
  icon: string; // Lucide icon name or emoji
  category: 'base' | 'ai' | 'logic';
  nodeComponent: React.ComponentType<any>;
  panelComponent: React.ComponentType<any>;
  schema: NodeSchema;
}

class NodeRegistry {
  private registry: Map<string, NodeDefinition> = new Map();

  register(definition: NodeDefinition) {
    this.registry.set(definition.type, definition);
  }

  get(type: string): NodeDefinition | undefined {
    return this.registry.get(type);
  }

  getAll(): NodeDefinition[] {
    return Array.from(this.registry.values());
  }

  getNodeTypesMap() {
    const map: Record<string, any> = {};
    this.registry.forEach((def, type) => {
      map[type] = def.nodeComponent;
    });
    return map;
  }
}

export const nodeRegistry = new NodeRegistry();

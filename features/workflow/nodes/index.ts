
import { nodeRegistry } from '../core/registry';
import { StartNode, LLMNode, ConditionNode, EndNode } from './components/CustomNodes';
import { StartNodeSchema, LLMNodeSchema, ConditionNodeSchema } from './schemas';

export const registerAllNodes = () => {
  // Use a simple guard to prevent double registration in dev mode
  if (nodeRegistry.getAll().length > 0) return;

  nodeRegistry.register({
    type: 'start',
    title: '开始',
    icon: '⚡',
    category: 'base',
    nodeComponent: StartNode,
    panelComponent: () => null,
    schema: StartNodeSchema
  });

  nodeRegistry.register({
    type: 'llm',
    title: '大模型',
    icon: '🧠',
    category: 'ai',
    nodeComponent: LLMNode,
    panelComponent: () => null,
    schema: LLMNodeSchema
  });

  nodeRegistry.register({
    type: 'condition',
    title: '条件分支',
    icon: '⚖️',
    category: 'logic',
    nodeComponent: ConditionNode,
    panelComponent: () => null,
    schema: ConditionNodeSchema
  });

  nodeRegistry.register({
    type: 'end',
    title: '结束',
    icon: '🏁',
    category: 'base',
    nodeComponent: EndNode,
    panelComponent: () => null,
    schema: {}
  });
};

// Auto-register on module load to prevent "Default Node" flicker on first entry
registerAllNodes();

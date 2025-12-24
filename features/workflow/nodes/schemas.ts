
import { NodeSchema } from '../core/model';

export const StartNodeSchema: NodeSchema = {
  triggerType: {
    type: 'select',
    label: 'Trigger Type',
    options: ['Webhook', 'Manual', 'Schedule'],
    default: 'Manual'
  },
  description: {
    type: 'textarea',
    label: 'Description'
  }
};

export const LLMNodeSchema: NodeSchema = {
  model: {
    type: 'select',
    label: 'Model',
    options: ['gemini-3-flash-preview', 'gemini-3-pro-preview', 'deepseek-v3'],
    required: true,
    default: 'gemini-3-flash-preview'
  },
  prompt: {
    type: 'textarea',
    label: 'System Prompt',
    required: true
  },
  temperature: {
    type: 'number',
    label: 'Temperature',
    default: 0.7
  }
};

export const ConditionNodeSchema: NodeSchema = {
  variable: {
    type: 'string',
    label: 'Input Variable',
    required: true
  },
  operator: {
    type: 'select',
    label: 'Operator',
    options: ['equals', 'contains', 'greater_than', 'less_than'],
    default: 'equals'
  },
  value: {
    type: 'string',
    label: 'Comparison Value'
  }
};


import { Workflow } from './model';

export const serializeWorkflow = (workflow: Workflow): string => {
  return JSON.stringify(workflow, null, 2);
};

export const deserializeWorkflow = (json: string): Workflow => {
  try {
    const data = JSON.parse(json);
    // Basic validation could be added here
    return data as Workflow;
  } catch (e) {
    console.error('Failed to deserialize workflow:', e);
    throw new Error('Invalid workflow JSON');
  }
};


import React from 'react';
import { useWorkflowStore } from '../../store/workflow.store';
import { nodeRegistry } from '../../core/registry';
import { PropertySchema } from '../../core/model';
// Fix: Import clsx to resolve "Cannot find name 'clsx'" errors
import { clsx } from 'clsx';

export const DynamicPanel: React.FC = () => {
  const { selectedNodeId, nodes, updateNodeData, selectNode } = useWorkflowStore();
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  
  if (!selectedNode) return null;

  const definition = nodeRegistry.get(selectedNode.type!);
  if (!definition) return <div>Unknown Node Type</div>;

  const currentParams = selectedNode.data.params || {};

  const handleFieldChange = (key: string, value: any) => {
    updateNodeData(selectedNode.id, { [key]: value });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-2xl">
            {definition.icon}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">{definition.title}</h2>
            <p className="text-[10px] text-slate-400 font-mono tracking-tighter mt-0.5">{selectedNode.id}</p>
          </div>
        </div>
        <button 
          onClick={() => selectNode(null)}
          className="p-1.5 hover:bg-white rounded-full text-slate-400 hover:text-slate-600 transition-all shadow-sm active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        <div className="space-y-6">
          {Object.entries(definition.schema).map(([key, schema]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {schema.label} {schema.required && <span className="text-rose-500">*</span>}
                </label>
              </div>
              
              <FieldRenderer 
                schema={schema} 
                value={currentParams[key] ?? schema.default} 
                onChange={(val) => handleFieldChange(key, val)} 
              />
              
              {schema.description && (
                <p className="text-[10px] text-slate-400 leading-relaxed italic">{schema.description}</p>
              )}
            </div>
          ))}
          
          {Object.keys(definition.schema).length === 0 && (
            <div className="py-12 text-center">
              <div className="text-slate-200 mb-3">
                <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9.09 9 1-1A3 3 0 0 1 12 11c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <p className="text-xs text-slate-400">This node has no configurable parameters</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
        <button className="flex-1 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-slate-800 transition-all">
          Apply Changes
        </button>
      </div>
    </div>
  );
};

const FieldRenderer: React.FC<{ 
  schema: PropertySchema; 
  value: any; 
  onChange: (val: any) => void 
}> = ({ schema, value, onChange }) => {
  const baseClasses = "w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 bg-white transition-all shadow-sm";

  switch (schema.type) {
    case 'select':
      return (
        <div className="relative">
          <select 
            className={clsx(baseClasses, "appearance-none pr-8")}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="" disabled>Choose...</option>
            {schema.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      );
    case 'textarea':
      return (
        <textarea 
          className={clsx(baseClasses, "h-32 resize-none")}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter prompt or configuration..."
        />
      );
    case 'number':
      return (
        <input 
          type="number"
          className={baseClasses}
          value={value ?? ''}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    case 'boolean':
      return (
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox"
              className="sr-only"
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
            />
            <div className={clsx(
              "w-10 h-5 rounded-full transition-all",
              value ? "bg-blue-600" : "bg-slate-200"
            )}></div>
            <div className={clsx(
              "absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all transform",
              value ? "translate-x-5" : "translate-x-0"
            )}></div>
          </div>
          <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Enabled</span>
        </label>
      );
    default:
      return (
        <input 
          type="text"
          className={baseClasses}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};

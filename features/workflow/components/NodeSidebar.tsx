
import React from 'react';
import { nodeRegistry } from '../core/registry';

export const NodeSidebar: React.FC = () => {
  const nodes = nodeRegistry.getAll();
  
  const categories = Array.from(new Set(nodes.map(n => n.category)));

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 border-r bg-white flex flex-col overflow-y-auto">
      <div className="p-4 border-b">
        <h3 className="text-sm font-bold text-slate-900">Components</h3>
        <p className="text-[10px] text-slate-500">Drag items to canvas</p>
      </div>

      <div className="p-2 space-y-6">
        {categories.map(cat => (
          <div key={cat} className="space-y-2">
            <h4 className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat}</h4>
            <div className="grid grid-cols-1 gap-1">
              {nodes.filter(n => n.category === cat).map(node => (
                <div
                  key={node.type}
                  className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm hover:border-blue-300 hover:bg-blue-50 cursor-grab active:cursor-grabbing flex items-center gap-3 transition-colors group"
                  draggable
                  onDragStart={(e) => onDragStart(e, node.type)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{node.icon}</span>
                  <span className="text-xs font-medium text-slate-700">{node.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

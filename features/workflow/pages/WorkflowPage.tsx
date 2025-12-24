
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WorkflowCanvas } from '../components/WorkflowCanvas';
import { DynamicPanel } from '../nodes/panels/DynamicPanel';
// Import already initializes registration
import '../nodes/index'; 
import { useWorkflowStore } from '../store/workflow.store';
import { nodeRegistry } from '../core/registry';
import { clsx } from 'clsx';

export const WorkflowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { initWorkflow, name, selectedNodeId, addNode } = useWorkflowStore();
  const [showAddMenu, setShowAddMenu] = useState(false);

  useEffect(() => {
    // Initial data load
    initWorkflow({
      id: id || 'demo-1',
      name: '智能助手流 - 生产环境',
      nodes: [
        { 
          id: 'start_1', 
          type: 'start', 
          position: { x: 100, y: 150 }, 
          data: { label: '开始', params: {} } 
        },
        { 
          id: 'llm_1', 
          type: 'llm', 
          position: { x: 450, y: 150 }, 
          data: { label: '大模型012', params: { model: 'gemini-3-flash-preview' } } 
        },
        { 
          id: 'end_1', 
          type: 'end', 
          position: { x: 850, y: 180 }, 
          data: { label: '结束', params: {} } 
        }
      ],
      edges: [
        { id: 'e1-2', source: 'start_1', target: 'llm_1' },
        { id: 'e2-3', source: 'llm_1', target: 'end_1' }
      ]
    });
  }, [id, initWorkflow]);

  const handleAddNewNode = (type: string) => {
    addNode(type, { x: 400, y: 300 });
    setShowAddMenu(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-14 bg-white/80 backdrop-blur-md border-b px-4 flex items-center justify-between z-30 absolute top-0 left-0 right-0 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/workflows" className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Workflow Editor</span>
            <h1 className="text-sm font-bold text-slate-900 leading-none">{name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[11px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-100 shadow-sm">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
             Auto-saving
          </div>
          <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
          <button className="px-5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>
             Publish
          </button>
        </div>
      </header>

      {/* Full Screen Canvas */}
      <main className="flex-1 relative z-0 pt-14">
        <WorkflowCanvas />
      </main>

      {/* Floating Add Menu (Bottom Left) */}
      <div className="absolute bottom-8 left-8 z-20 flex flex-col-reverse items-start gap-4">
        <button 
          onClick={() => setShowAddMenu(!showAddMenu)}
          className={clsx(
            "w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-90",
            showAddMenu ? "bg-slate-800 text-white rotate-45" : "bg-blue-600 text-white"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>

        {showAddMenu && (
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 min-w-[200px] animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">添加节点</div>
            <div className="space-y-1">
              {nodeRegistry.getAll().map(node => (
                <button
                  key={node.type}
                  onClick={() => handleAddNewNode(node.type)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{node.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{node.title}</span>
                    <span className="text-[10px] text-slate-400 leading-none capitalize">{node.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Configuration Panel (Right Side) */}
      <aside 
        className={clsx(
          "fixed top-20 right-6 bottom-8 w-[400px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 z-20 transition-all duration-300 transform flex flex-col overflow-hidden",
          selectedNodeId ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0 pointer-events-none"
        )}
      >
        <DynamicPanel />
      </aside>
    </div>
  );
};


import React from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_WORKFLOWS = [
  { id: 'wf_1', name: 'Intelligent Support Bot', updated: '2 hours ago', nodes: 8, status: 'published' },
  { id: 'wf_2', name: 'Auto-Content Generator', updated: 'Yesterday', nodes: 5, status: 'draft' },
  { id: 'wf_3', name: 'Email Classifier', updated: '3 days ago', nodes: 12, status: 'published' },
];

export const WorkflowListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Workflows</h1>
            <p className="text-slate-500 text-sm">Design and orchestrate your AI agents</p>
          </div>
          <button 
            onClick={() => navigate('/workflows/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 flex items-center gap-2 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            New Workflow
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_WORKFLOWS.map(wf => (
            <div 
              key={wf.id}
              onClick={() => navigate(`/workflows/${wf.id}`)}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-xl hover:border-blue-300 cursor-pointer transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                  wf.status === 'published' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                }`}>
                  {wf.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{wf.name}</h3>
              <p className="text-slate-400 text-xs mb-4">Last edited {wf.updated}</p>
              
              <div className="flex items-center gap-4 border-t pt-4">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
                  <span className="text-xs font-semibold text-slate-600">{wf.nodes} Nodes</span>
                </div>
              </div>
            </div>
          ))}

          {/* Create New Card */}
          <div 
             onClick={() => navigate('/workflows/new')}
             className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 hover:border-blue-400 hover:bg-blue-50 transition-all group cursor-pointer"
          >
             <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3 group-hover:bg-blue-100 group-hover:text-blue-500 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
             </div>
             <p className="text-sm font-bold text-slate-500 group-hover:text-blue-600">Start from scratch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

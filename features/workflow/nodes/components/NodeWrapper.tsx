
import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { clsx } from 'clsx';
import { useWorkflowStore } from '../../store/workflow.store';

interface NodeWrapperProps {
  id: string;
  selected?: boolean;
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  inputs?: boolean;
  outputs?: boolean | string[];
}

export const NodeWrapper: React.FC<NodeWrapperProps> = ({ 
  id, selected, title, icon, children, inputs = true, outputs = true 
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const removeNode = useWorkflowStore(state => state.removeNode);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  return (
    <div className={clsx(
      "min-w-[280px] bg-white rounded-xl border transition-all duration-200 shadow-sm",
      selected ? "border-blue-500 ring-4 ring-blue-50" : "border-slate-200 hover:border-slate-300"
    )}>
      {/* Target Handle */}
      {inputs && (
        <Handle 
          type="target" 
          position={Position.Left} 
          className="w-3 h-3 bg-blue-500 border-2 border-white !left-[-6px]" 
        />
      )}
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-slate-100 rounded-md flex items-center justify-center text-lg shadow-inner border border-slate-200/50">
            {icon}
          </div>
          <span className="font-bold text-sm text-slate-900 tracking-tight">{title}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-slate-400">
          <button className="p-1 hover:bg-slate-100 rounded transition-colors" title="运行该节点">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          </button>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className={clsx(
                "p-1 hover:bg-slate-100 rounded transition-colors",
                showMenu && "bg-slate-100 text-slate-600"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </button>

            {/* Context Menu Dropdown */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-slate-100 py-1 min-w-[120px] z-[100] animate-in fade-in zoom-in duration-100">
                <button 
                  onClick={() => {
                    // Selecting node also opens drawer, but here we can focus it
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  配置节点
                </button>
                <div className="h-[1px] bg-slate-100 my-1"></div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNode(id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-rose-500 hover:bg-rose-50 flex items-center gap-2 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  删除节点
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="px-4 pb-4 space-y-3">
        {children}
      </div>

      {/* Source Handles */}
      {outputs === true && (
        <Handle 
          type="source" 
          position={Position.Right} 
          className="w-3 h-3 bg-blue-500 border-2 border-white !right-[-6px]" 
        />
      )}
      
      {Array.isArray(outputs) && outputs.map((handleId, idx) => (
        <Handle 
          key={handleId}
          type="source" 
          position={Position.Right} 
          id={handleId}
          style={{ top: '50%' }}
          className="w-3 h-3 bg-blue-500 border-2 border-white !right-[-6px]"
        />
      ))}
    </div>
  );
};


import React from 'react';
import { NodeWrapper } from './NodeWrapper';
import { clsx } from 'clsx';

const VariableBadge: React.FC<{ label: string; type?: string; warning?: boolean }> = ({ label, type, warning }) => (
  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-medium text-slate-700">
    {warning && (
      <span className="w-3.5 h-3.5 bg-amber-500 text-white flex items-center justify-center rounded-full scale-[0.8] font-bold">!</span>
    )}
    <span>{label}</span>
    {type && <span className="text-slate-400 font-normal">{type}</span>}
  </div>
);

export const StartNode: React.FC<any> = ({ id, selected }) => (
  <NodeWrapper id={id} selected={selected} title="开始" icon="⚡" inputs={false}>
    <div className="flex items-center gap-4">
      <span className="text-[11px] text-slate-400 w-8">输入</span>
      <VariableBadge label="input" warning />
    </div>
  </NodeWrapper>
);

export const LLMNode: React.FC<any> = ({ id, selected, data }) => (
  <NodeWrapper 
    id={id} 
    selected={selected} 
    title={data.label || "大模型012"} 
    icon={<img src="https://api.iconify.design/logos:openai-icon.svg" className="w-4 h-4" alt="LLM" />}
  >
    {/* Input Row */}
    <div className="flex items-start gap-4">
      <span className="text-[11px] text-slate-400 w-8 pt-1">输入</span>
      <div className="flex flex-wrap gap-1.5">
        <VariableBadge label="input" warning />
      </div>
    </div>

    {/* Output Row */}
    <div className="flex items-start gap-4">
      <span className="text-[11px] text-slate-400 w-8 pt-1">输出</span>
      <div className="flex flex-wrap gap-1.5">
        <VariableBadge label="raw_output" type="Str" />
        <VariableBadge label="reasoning_content" type="Str" />
      </div>
    </div>
  </NodeWrapper>
);

export const ConditionNode: React.FC<any> = ({ id, selected }) => (
  <NodeWrapper 
    id={id} 
    selected={selected} 
    title="条件分支" 
    icon="⚖️"
    outputs={['true', 'false']}
  >
    <div className="space-y-2">
      <div className="flex items-center justify-between bg-slate-50 p-2 rounded-md border border-slate-100">
        <span className="text-[11px] font-medium text-slate-600">If: score > 0.8</span>
        <span className="text-[9px] text-emerald-600 font-bold uppercase">True</span>
      </div>
      <div className="flex items-center justify-between bg-slate-50 p-2 rounded-md border border-slate-100">
        <span className="text-[11px] font-medium text-slate-400 italic">Default</span>
        <span className="text-[9px] text-rose-500 font-bold uppercase">False</span>
      </div>
    </div>
  </NodeWrapper>
);

export const EndNode: React.FC<any> = ({ id, selected }) => (
  <NodeWrapper id={id} selected={selected} title="结束" icon="🏁" outputs={false}>
    <div className="text-[11px] text-slate-500 italic">输出最终结果</div>
  </NodeWrapper>
);

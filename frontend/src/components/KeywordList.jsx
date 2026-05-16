import React from 'react';
import { Check, X } from 'lucide-react';

export default function KeywordList({ title, keywords, type }) {
  const isMatch = type === 'match';
  const Icon = isMatch ? Check : X;
  const bgClass = isMatch ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const iconClass = isMatch ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>
      {keywords.length === 0 ? (
        <p className="text-slate-500 italic">None found.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw, i) => (
            <span key={i} className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${bgClass}`}>
              <Icon size={14} className={iconClass} />
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

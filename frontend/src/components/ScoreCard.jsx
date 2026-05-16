import React from 'react';

export default function ScoreCard({ score }) {
  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">ATS Match Score</h3>
      <div className="relative flex items-center justify-center w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
          <circle 
            cx="64" cy="64" r="60" 
            stroke="currentColor" strokeWidth="8" fill="transparent" 
            strokeDasharray={377} strokeDashoffset={377 - (377 * score) / 100}
            className={`${getColor()} transition-all duration-1000 ease-out`} 
          />
        </svg>
        <div className="absolute text-3xl font-bold text-slate-800">{score}%</div>
      </div>
    </div>
  );
}

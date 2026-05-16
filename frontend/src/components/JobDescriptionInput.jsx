import React from 'react';

export default function JobDescriptionInput({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-slate-700">2. Target Job Description</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the full job description here..."
        className="w-full h-64 p-4 border border-slate-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      ></textarea>
    </div>
  );
}

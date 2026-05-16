import React, { useRef } from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

export default function FileUpload({ file, setFile }) {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') setFile(droppedFile);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-slate-700">1. Upload Resume (PDF)</label>
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current.click()}
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors h-64 ${file ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50 cursor-pointer'}`}
      >
        <input 
          type="file" 
          accept=".pdf" 
          className="hidden" 
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        
        {file ? (
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <FileIcon size={32} />
            </div>
            <p className="font-medium text-slate-800 break-all px-4">{file.name}</p>
            <button 
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 mt-2"
            >
              <X size={16} /> Remove File
            </button>
          </div>
        ) : (
          <>
            <div className="p-4 bg-slate-100 rounded-full text-slate-500 mb-4">
              <UploadCloud size={32} />
            </div>
            <p className="font-medium text-slate-700">Click or drag and drop</p>
            <p className="text-sm text-slate-500 mt-1">PDF format only</p>
          </>
        )}
      </div>
    </div>
  );
}

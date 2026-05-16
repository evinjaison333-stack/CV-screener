import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import AnalysisReport from './components/AnalysisReport';

export default function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!file || !jobDescription) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);

    try {
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 print-hide">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">AI Resume Analyzer</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Optimize your resume for ATS systems. Paste your target job description, upload your PDF resume, and get actionable insights instantly.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {!results ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="grid md:grid-cols-2 gap-8">
              <FileUpload file={file} setFile={setFile} />
              <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!file || !jobDescription || loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="animate-spin" size={20} /> Analyzing...</>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </div>
          </div>
        ) : (
          <AnalysisReport results={results} onReset={() => setResults(null)} />
        )}
      </main>
    </div>
  );
}

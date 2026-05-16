import React from 'react';
import { ArrowLeft, Download, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import ScoreCard from './ScoreCard';
import KeywordList from './KeywordList';

export default function AnalysisReport({ results, onReset }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8 print-hide">
        <button onClick={onReset} className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium">
          <ArrowLeft size={20} /> New Analysis
        </button>
        <button onClick={handlePrint} className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Download size={18} /> Export PDF
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <ScoreCard score={results.score} />
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
          <KeywordList title="Matched Keywords" keywords={results.matched_keywords} type="match" />
          <KeywordList title="Missing Keywords" keywords={results.missing_keywords} type="missing" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-500" /> Strengths
          </h3>
          <ul className="space-y-3">
            {results.strengths.map((item, i) => (
              <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                <span className="text-green-500 font-bold">•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-red-500" /> Weaknesses
          </h3>
          <ul className="space-y-3">
            {results.weaknesses.map((item, i) => (
              <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-500" /> AI Suggestions
          </h3>
          <ul className="space-y-3">
            {results.suggestions.map((item, i) => (
              <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                <span className="text-yellow-500 font-bold">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

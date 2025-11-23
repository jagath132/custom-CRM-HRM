
import React, { useState } from 'react';
import { EODReport } from '../types';
import { Calendar, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface EODHistoryProps {
  reports: EODReport[];
}

export const EODHistory: React.FC<EODHistoryProps> = ({ reports }) => {
  const [sortDesc, setSortDesc] = useState(true);

  const sortedReports = [...reports].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortDesc ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800">Report History</h3>
        <button
          onClick={() => setSortDesc(!sortDesc)}
          className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
        >
          Sort by Date {sortDesc ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>
      
      <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {sortedReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <FileText size={32} className="mb-2 opacity-20" />
            <p className="text-sm">No reports submitted yet.</p>
          </div>
        ) : (
          sortedReports.map(report => (
            <div key={report.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Calendar size={14} className="text-indigo-500" />
                  {new Date(report.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Submitted</span>
              </div>
              <div className="text-xs text-slate-600 line-clamp-3 group-hover:line-clamp-none transition-all">
                {report.summary ? (
                    <div className="prose prose-sm">
                        <pre className="whitespace-pre-wrap font-sans text-xs">{report.summary}</pre>
                    </div>
                ) : (
                    report.content
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

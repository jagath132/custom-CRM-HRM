
import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { generateEODSummary } from '../services/geminiService';

interface EODFormProps {
    onSubmit: (content: string, summary: string) => void;
}

export const EODForm: React.FC<EODFormProps> = ({ onSubmit }) => {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleGenerateSummary = async () => {
    if (!notes.trim()) return;
    setIsGenerating(true);
    const result = await generateEODSummary(notes);
    setSummary(result);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(notes, summary);
    setIsSubmitted(true);
    // Reset after 3 seconds for demo
    setTimeout(() => {
        setIsSubmitted(false);
        setNotes('');
        setSummary('');
    }, 3000);
  };

  if (isSubmitted) {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center h-full flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Send size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Great Job!</h3>
            <p className="text-slate-500">Your EOD report has been submitted successfully.</p>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
        Daily EOD Report
      </h3>
      
      <div className="flex-1 flex flex-col gap-4">
        <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">What did you work on today?</label>
            <textarea 
                className="w-full h-32 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-sm text-slate-700"
                placeholder="I fixed the login bug, updated the header component, and had a meeting with the design team..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex justify-end mt-2">
                <button 
                    type="button"
                    onClick={handleGenerateSummary}
                    disabled={isGenerating || !notes}
                    className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                >
                    {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    Enhance with AI
                </button>
            </div>
        </div>

        <div className="flex-1">
            <label className="block text-sm font-medium text-slate-600 mb-2">Summary (Preview)</label>
            <div className={`w-full h-full min-h-[120px] p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 overflow-y-auto ${isGenerating ? 'opacity-50' : ''}`}>
                {summary ? (
                    <div className="prose prose-sm">
                        <pre className="whitespace-pre-wrap font-sans">{summary}</pre>
                    </div>
                ) : (
                    <span className="text-slate-400 italic">AI generated summary will appear here...</span>
                )}
            </div>
        </div>

        <button 
            onClick={handleSubmit}
            disabled={!summary && !notes}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
            Submit Report
        </button>
      </div>
    </div>
  );
};

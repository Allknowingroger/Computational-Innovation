import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, RefreshCw, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { TechniqueDef, InnovationMethod } from '../types';

interface ResultsViewProps {
  content: string | string[];
  technique: TechniqueDef;
  onReset: () => void;
  onRetry: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ content, technique, onReset, onRetry }) => {
  const isVisualPrototyping = technique.id === InnovationMethod.VISUAL_PROTOTYPING;
  const isMultiImage = Array.isArray(content);
  // Fallback check for single image string
  const isSingleImage = !isMultiImage && typeof content === 'string' && content.startsWith('data:image');

  const handleCopy = () => {
    if (isMultiImage) {
      // For multiple images, trigger multiple downloads
      (content as string[]).forEach((src, idx) => {
        downloadImage(src, idx);
      });
    } else if (isSingleImage) {
      downloadImage(content as string, 0);
    } else {
      // For text
      navigator.clipboard.writeText(content as string);
      alert("Analysis copied to clipboard!");
    }
  };

  const downloadImage = (dataUri: string, index: number) => {
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = `innoguide-variation-${index + 1}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onReset}
          className="flex items-center text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Methods
        </button>
        
        <div className="flex space-x-3">
          <button 
            onClick={onRetry}
            className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            Regenerate
          </button>
          <button 
            onClick={handleCopy}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Download size={16} className="mr-2" />
            {isVisualPrototyping ? (isMultiImage ? "Download All" : "Download Image") : "Copy Result"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className={`h-2 w-full ${technique.color}`} />
        <div className="p-8 md:p-10">
          <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-slate-100">
            <span className={`px-3 py-1 text-xs font-bold tracking-wider uppercase text-white rounded-full ${technique.color}`}>
              {technique.name} {isVisualPrototyping ? "Result" : "Analysis"}
            </span>
          </div>

          {isMultiImage ? (
            <div>
              <p className="text-slate-600 mb-6">Here are 4 generated variations based on your request:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(content as string[]).map((imgSrc, idx) => (
                  <div key={idx} className="flex flex-col space-y-3 group">
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 aspect-square flex items-center justify-center">
                        <img 
                          src={imgSrc} 
                          alt={`Variation ${idx + 1}`} 
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                    </div>
                    <button 
                      onClick={() => downloadImage(imgSrc, idx)}
                      className="self-center flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
                    >
                      <Download size={14} className="mr-1.5" />
                      Download Variation {idx + 1}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : isSingleImage ? (
            <div className="flex flex-col items-center justify-center">
               <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 shadow-inner">
                  <img 
                    src={content as string} 
                    alt="Generated Prototype" 
                    className="max-w-full rounded-lg shadow-sm max-h-[600px] object-contain"
                  />
               </div>
               <p className="mt-4 text-sm text-slate-500">
                 Generated using Gemini 2.5 Flash Image
               </p>
            </div>
          ) : (
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600">
              <ReactMarkdown>{content as string}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
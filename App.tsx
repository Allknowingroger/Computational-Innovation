import React, { useState, useCallback } from 'react';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { TECHNIQUES } from './constants';
import { TechniqueDef, LoadingState, InnovationMethod } from './types';
import { TechniqueCard } from './components/TechniqueCard';
import { ProblemInput } from './components/ProblemInput';
import { ResultsView } from './components/ResultsView';
import { generateInnovationAnalysis } from './services/geminiService';

export default function App() {
  const [problem, setProblem] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<TechniqueDef | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [result, setResult] = useState<string | string[]>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleTechniqueSelect = useCallback(async (technique: TechniqueDef) => {
    // Validation for Text-only techniques
    if (technique.id !== InnovationMethod.VISUAL_PROTOTYPING && !problem.trim()) {
      alert("Please enter a problem description first.");
      return;
    }

    // Validation for Visual Prototyping
    if (technique.id === InnovationMethod.VISUAL_PROTOTYPING) {
      if (!selectedImage) {
        alert("Please attach an image for Visual Prototyping.");
        return;
      }
      if (!problem.trim()) {
        // Optional: warn if no prompt is provided for image editing? 
        // Usually you need a prompt to "edit", but maybe just "enhance" is default.
        // Let's enforce it gently or let the service handle default.
      }
    }

    setSelectedTechnique(technique);
    setLoadingState('loading');
    setErrorMsg('');

    try {
      const data = await generateInnovationAnalysis(problem, technique, selectedImage);
      setResult(data);
      setLoadingState('success');
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
      setLoadingState('error');
    }
  }, [problem, selectedImage]);

  const handleReset = () => {
    setLoadingState('idle');
    setSelectedTechnique(null);
    setResult('');
    setErrorMsg('');
  };

  const handleRetry = () => {
    if (selectedTechnique) {
      handleTechniqueSelect(selectedTechnique);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BrainCircuit className="text-white h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">InnoGuide</h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            Powered by Gemini
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {loadingState === 'idle' && (
          <>
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Systematic Innovation Toolkit
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Break through creative blocks using proven methodologies. 
                Describe your challenge, select a framework, or visualize ideas with AI.
              </p>
            </div>

            <ProblemInput 
              value={problem} 
              onChange={setProblem}
              image={selectedImage}
              onImageChange={setSelectedImage}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {TECHNIQUES.map((tech) => (
                <TechniqueCard 
                  key={tech.id} 
                  technique={tech} 
                  onClick={handleTechniqueSelect}
                />
              ))}
            </div>
          </>
        )}

        {loadingState === 'loading' && (
          <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in">
            <div className={`p-4 rounded-full bg-blue-50 mb-6 relative`}>
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-ping"></div>
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin relative z-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Applying {selectedTechnique?.name}...</h3>
            <p className="text-slate-500">
              {selectedTechnique?.id === InnovationMethod.VISUAL_PROTOTYPING 
                ? "Generating variations..." 
                : "Generating structured solutions for your challenge."}
            </p>
          </div>
        )}

        {loadingState === 'error' && (
          <div className="flex flex-col items-center justify-center h-[50vh] animate-fade-in">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md text-center">
              <h3 className="text-red-800 font-bold text-lg mb-2">Analysis Failed</h3>
              <p className="text-red-600 mb-6">{errorMsg}</p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={handleReset}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Choose Different Method
                </button>
                <button 
                  onClick={handleRetry}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {loadingState === 'success' && selectedTechnique && (
          <ResultsView 
            content={result} 
            technique={selectedTechnique} 
            onReset={handleReset}
            onRetry={handleRetry}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} InnoGuide. Powered by Gemini 3 Pro & 2.5 Flash Image.</p>
        </div>
      </footer>
    </div>
  );
}
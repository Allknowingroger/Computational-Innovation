import React, { useRef } from 'react';
import { Sparkles, Image as ImageIcon, X } from 'lucide-react';

interface ProblemInputProps {
  value: string;
  onChange: (val: string) => void;
  image: File | null;
  onImageChange: (file: File | null) => void;
  disabled?: boolean;
}

export const ProblemInput: React.FC<ProblemInputProps> = ({ 
  value, 
  onChange, 
  image, 
  onImageChange, 
  disabled 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  const clearImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 animate-slide-up">
      <label htmlFor="problem" className="block text-sm font-medium text-slate-700 mb-2">
        What challenge are you trying to solve?
      </label>
      
      <div className="relative bg-white border border-slate-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all overflow-hidden">
        <textarea
          id="problem"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="e.g., Reduce plastic waste, or 'Add a retro filter' (for Visual Prototyping)"
          className="w-full h-32 p-4 pr-12 text-lg text-slate-800 bg-transparent border-none focus:ring-0 resize-none disabled:text-slate-400 placeholder:text-slate-400"
        />
        <div className="absolute top-4 right-4 text-slate-300 pointer-events-none">
          <Sparkles size={20} />
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-2">
             <input 
              type="file" 
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {image ? (
              <div className="flex items-center bg-white border border-slate-200 rounded-lg py-1 px-2 pr-1 shadow-sm">
                <div className="w-8 h-8 rounded bg-slate-100 overflow-hidden mr-2 relative">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-slate-600 truncate max-w-[100px] mr-2">
                  {image.name}
                </span>
                <button 
                  onClick={clearImage}
                  className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors px-2 py-1 rounded-md hover:bg-white"
                title="Attach an image for Visual Prototyping"
              >
                <ImageIcon size={18} className="mr-2" />
                Attach Image
              </button>
            )}
          </div>
          
          <div className="text-xs text-slate-400">
            {image ? 'Image attached' : 'Text input'}
          </div>
        </div>
      </div>
      
      <p className="mt-2 text-xs text-slate-400 text-right">
        For Visual Prototyping, please attach an image and describe the edit.
      </p>
    </div>
  );
};
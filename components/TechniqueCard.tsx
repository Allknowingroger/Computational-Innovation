import React from 'react';
import { TechniqueDef } from '../types';
import * as Icons from 'lucide-react';

interface TechniqueCardProps {
  technique: TechniqueDef;
  onClick: (t: TechniqueDef) => void;
  isSelected?: boolean;
}

export const TechniqueCard: React.FC<TechniqueCardProps> = ({ technique, onClick, isSelected }) => {
  // Dynamic Icon rendering
  const IconComponent = (Icons as any)[technique.icon] || Icons.Lightbulb;

  return (
    <button
      onClick={() => onClick(technique)}
      className={`
        relative overflow-hidden text-left p-6 rounded-xl border transition-all duration-300 group
        ${isSelected 
          ? 'border-blue-500 ring-2 ring-blue-200 bg-white shadow-lg scale-[1.02]' 
          : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-1'
        }
      `}
    >
      <div className={`
        absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity
      `}>
        <IconComponent size={80} />
      </div>

      <div className={`
        inline-flex items-center justify-center p-3 rounded-lg mb-4 text-white shadow-sm
        ${technique.color}
      `}>
        <IconComponent size={24} />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
        {technique.name}
      </h3>
      
      <p className="text-sm text-slate-500 leading-relaxed">
        {technique.description}
      </p>
    </button>
  );
};

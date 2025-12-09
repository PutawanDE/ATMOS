import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { GeminiHealthInsight } from "../types";

interface AIInsightProps {
  insight: GeminiHealthInsight | null;
  loading: boolean;
}

export const AIInsight: React.FC<AIInsightProps> = ({ insight, loading }) => {
  const { t } = useLanguage();

  if (!insight && !loading) return null;

  return (
    <div className="bg-black text-white p-6 border-2 border-black shadow-brutalist relative overflow-hidden group min-h-[160px] flex flex-col">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity select-none">
        <span className="material-symbols-outlined text-8xl">psychology</span>
      </div>
      
      <div className="flex items-center gap-2 mb-4 relative z-10">
         <span className="text-xs font-bold uppercase bg-white text-black px-2 py-0.5 tracking-widest border border-white">
            AI Analysis
         </span>
         {loading && <span className="animate-pulse w-2 h-2 bg-white rounded-full"></span>}
      </div>

      <div className="font-mono text-sm md:text-lg leading-relaxed relative z-10 flex-1">
        {loading ? (
            <div className="space-y-3 animate-pulse opacity-50 mt-2">
                <div className="h-4 bg-gray-700 w-3/4"></div>
                <div className="h-4 bg-gray-700 w-5/6"></div>
                <div className="h-4 bg-gray-700 w-1/2"></div>
            </div>
        ) : (
            <p className="typing-effect">"{insight?.summary}"</p>
        )}
      </div>
      
      {!loading && insight && (
          <div className="relative z-10 mt-4 pt-4 border-t border-white/20 text-[10px] text-gray-400 font-mono uppercase">
            Powered by Gemini 2.5
          </div>
      )}
    </div>
  );
};

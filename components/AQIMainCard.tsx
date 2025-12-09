
import React from "react";
import { GET_AQI_META } from "../constants";
import { useLanguage } from "../context/LanguageContext";

interface AQIMainCardProps {
  aqi: number;
  locationName: string;
  onNavigate: () => void;
}

export const AQIMainCard: React.FC<AQIMainCardProps> = ({ aqi, locationName, onNavigate }) => {
  const { language, t } = useLanguage();
  const meta = GET_AQI_META(aqi, language);

  return (
    <div className={`relative flex flex-col justify-between p-6 border-2 border-black shadow-brutalist ${meta.color} text-white h-full min-h-[300px] overflow-hidden`}>
      <div className="flex justify-between items-start relative z-10">
        <p className="font-mono text-sm font-bold opacity-90 uppercase tracking-widest mb-2">
          {t.airQualityScore}
        </p>
        <button 
            onClick={onNavigate} 
            className="flex items-center gap-1 text-[10px] font-bold uppercase hover:bg-black/20 px-2 py-1 transition-colors border border-white/30 backdrop-blur-sm"
            title={t.howToRead}
        >
            <span className="material-symbols-outlined text-sm">info</span>
            <span className="hidden sm:inline">{t.howToRead}</span>
        </button>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4">
            <h2 className="text-9xl font-black tracking-tighter leading-none shadow-black drop-shadow-lg">
            {aqi}
            </h2>
        </div>
        <h3 className="text-4xl font-black uppercase tracking-tight mt-2 text-white drop-shadow-md">
          {meta.translatedLevel}
        </h3>
      </div>

      <div className="mt-8 pt-6 border-t-2 border-white/40 relative z-10">
        <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-3xl drop-shadow-md">{meta.icon}</span>
            <div>
                <p className="font-bold uppercase text-sm mb-1 drop-shadow-sm">{t.mainConcern}: {meta.mainConcern}</p>
                <p className="text-sm font-medium opacity-95 leading-relaxed drop-shadow-sm">
                {meta.description}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

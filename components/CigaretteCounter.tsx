
import React from "react";
import { CIGARETTE_FACTOR } from "../constants";
import { useLanguage } from "../context/LanguageContext";

interface CigaretteCounterProps {
  pm25: number;
}

export const CigaretteCounter: React.FC<CigaretteCounterProps> = ({ pm25 }) => {
  const { t } = useLanguage();
  const cigs = (pm25 / CIGARETTE_FACTOR).toFixed(1);
  const cigCount = parseFloat(cigs);
  
  let colorClass = "text-aqi-good";
  if (cigCount > 0.5) colorClass = "text-aqi-moderate";
  if (cigCount > 1.5) colorClass = "text-aqi-unhealthy";
  if (cigCount > 3) colorClass = "text-aqi-hazardous";

  return (
    <div className="bg-white p-6 border-2 border-black shadow-brutalist h-full flex flex-col">
      <h2 className="text-xl font-black uppercase tracking-wider mb-4 border-b-2 border-black pb-2 shrink-0">
        {t.lungImpact}
      </h2>
      <div className="flex flex-col lg:flex-row items-center gap-6 flex-1 justify-center">
        <div className="w-40 p-4 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 shrink-0">
            <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsPVTOFMEERaOX02L9AF8vxS2wx_MtJ6XtXLvL7spNtX2A-zMYGqkoIgOAt9iKI-m0RsRkRNJGZrDJn8aulOo6xYElhRw8mw745wLSph4_5Cy8dYkUWMIdIa5OANpER5cW05DJBUl2Jjc5bDRlt5k-OUtjvDOX8QATW6_QEXKVQoexN0-Ky7Q7Ojemr3ArIdvX0Vtyi3707EkoanSjImOostOnBQ6Wvbn1C-7msuausX56sJjPiGDSDda-_Ne6MPrkZG8V5B3vdj53" 
                alt="Cigarette" 
                className="w-full grayscale opacity-80 mix-blend-multiply"
            />
        </div>
        
        <div className="text-center lg:text-left flex-1">
            <p className="text-gray-500 text-sm mb-2">{t.lungImpactDesc}</p>
            <div className={`text-7xl font-black ${colorClass} leading-none`}>
                ≈{cigs}
            </div>
            <div className="text-2xl font-black uppercase mt-1">{t.cigarettes}</div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-4 border-t border-gray-200 pt-2">
                {t.lungImpactDisclaimer}
            </p>
        </div>
      </div>
    </div>
  );
};

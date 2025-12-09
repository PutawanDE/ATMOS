
import React from "react";
import { useLanguage } from "../context/LanguageContext";

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  const { t } = useLanguage();
  
  const scaleLevels = [
    { range: "0-50", color: "bg-aqi-good", textColor: "text-aqi-good", label: t.aqiLevels.good, desc: t.aqiDesc.good },
    { range: "51-100", color: "bg-aqi-moderate", textColor: "text-aqi-moderate", label: t.aqiLevels.moderate, desc: t.aqiDesc.moderate },
    { range: "101-150", color: "bg-aqi-sensitive", textColor: "text-aqi-sensitive", label: t.aqiLevels.sensitive, desc: t.aqiDesc.sensitive },
    { range: "151-200", color: "bg-aqi-unhealthy", textColor: "text-aqi-unhealthy", label: t.aqiLevels.unhealthy, desc: t.aqiDesc.unhealthy },
    { range: "201-300", color: "bg-aqi-very-unhealthy", textColor: "text-aqi-very-unhealthy", label: t.aqiLevels.veryUnhealthy, desc: t.aqiDesc.veryUnhealthy },
    { range: "301+", color: "bg-aqi-hazardous", textColor: "text-aqi-hazardous", label: t.aqiLevels.hazardous, desc: t.aqiDesc.hazardous },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white border-2 border-black shadow-brutalist p-8">
        <div className="flex justify-between items-start border-b-4 border-black pb-6 mb-8">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">{t.aboutTitle}</h1>
            <button 
                onClick={onBack}
                className="hidden md:block px-6 py-2 bg-yellow-400 border-2 border-black font-bold uppercase shadow-brutalist-sm hover:translate-y-1 hover:shadow-none transition-all"
            >
                {t.backToDashboard}
            </button>
        </div>
        
        <div className="space-y-12 font-mono">
            {/* Mission */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <h2 className="text-xl font-bold uppercase bg-yellow-400 inline-block px-3 py-1 border-2 border-black transform -rotate-2 shadow-brutalist-sm">
                        {t.aboutMissionTitle}
                    </h2>
                </div>
                <div className="md:col-span-3">
                    <p className="text-lg leading-relaxed font-medium">{t.aboutMissionDesc}</p>
                </div>
            </section>

            {/* Scale */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                     <h2 className="text-xl font-bold uppercase bg-blue-500 text-white inline-block px-3 py-1 border-2 border-black transform rotate-2 shadow-brutalist-sm">
                        {t.aboutScaleTitle}
                    </h2>
                </div>
                <div className="md:col-span-3">
                     <p className="text-lg leading-relaxed font-medium mb-6">{t.aboutScaleDesc}</p>
                     
                     <div className="flex flex-col gap-4">
                        {scaleLevels.map((level) => (
                            <div key={level.range} className="flex flex-col sm:flex-row border-2 border-black shadow-brutalist-sm bg-white">
                                <div className={`w-full sm:w-32 p-4 flex flex-col justify-center items-center ${level.color} text-white font-bold border-b-2 sm:border-b-0 sm:border-r-2 border-black`}>
                                    <span className="text-2xl">{level.range}</span>
                                </div>
                                <div className="p-4 flex-1">
                                    <h3 className={`font-black uppercase text-lg mb-1 ${level.textColor}`}>{level.label}</h3>
                                    <p className="text-sm text-gray-600 leading-snug">{level.desc}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </section>

            {/* Data */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <h2 className="text-xl font-bold uppercase bg-black text-white inline-block px-3 py-1 border-2 border-transparent transform rotate-1 shadow-brutalist-sm">
                        {t.aboutDataTitle}
                    </h2>
                </div>
                <div className="md:col-span-3">
                    <p className="text-lg leading-relaxed font-medium">{t.aboutDataDesc}</p>
                </div>
            </section>
        </div>
        
        <div className="border-t-2 border-gray-200 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-mono">
            <p>v1.0.0 - Built with React & Tailwind.</p>
            <button 
                onClick={onBack}
                className="md:hidden w-full px-6 py-3 bg-yellow-400 text-black border-2 border-black font-bold uppercase"
            >
                {t.backToDashboard}
            </button>
        </div>
      </div>
    </div>
  );
};

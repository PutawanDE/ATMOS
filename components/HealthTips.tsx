
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { HealthTipSet } from "../types";

interface HealthTipsProps {
  aqi: number;
}

export const HealthTips: React.FC<HealthTipsProps> = ({ aqi }) => {
  const { t } = useLanguage();

  // Helper to select the correct tip set based on AQI
  const getTips = (aqi: number): HealthTipSet => {
    if (aqi <= 50) return t.healthTipsContent.good;
    if (aqi <= 100) return t.healthTipsContent.moderate;
    if (aqi <= 150) return t.healthTipsContent.sensitive;
    if (aqi <= 200) return t.healthTipsContent.unhealthy;
    if (aqi <= 300) return t.healthTipsContent.veryUnhealthy;
    return t.healthTipsContent.hazardous;
  };

  const tips = getTips(aqi);

  return (
    <div className="bg-white border-2 border-black shadow-brutalist h-full">
      <h2 className="text-xl font-black uppercase tracking-wider p-4 border-b-2 border-black bg-gray-50">
        {t.healthTips}
      </h2>
      
      <div className="flex flex-col divide-y-2 divide-black">
        {/* Everyone */}
        <details className="group" open>
          <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-red-500">family_restroom</span>
              <span className="text-sm font-bold uppercase">{t.forEveryone}</span>
            </div>
            <span className="text-2xl font-black transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="px-4 pb-4 pl-12 text-sm text-gray-600 leading-relaxed">
             {tips.everyone}
          </div>
        </details>

        {/* Sensitive */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-orange-500">medical_services</span>
              <span className="text-sm font-bold uppercase">{t.sensitiveGroups}</span>
            </div>
            <span className="text-2xl font-black transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="px-4 pb-4 pl-12 text-sm text-gray-600 leading-relaxed">
            {tips.sensitive}
          </div>
        </details>

        {/* Outdoors */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-600">directions_run</span>
              <span className="text-sm font-bold uppercase">{t.outdoorActivity}</span>
            </div>
            <span className="text-2xl font-black transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="px-4 pb-4 pl-12 text-sm text-gray-600 leading-relaxed">
             {tips.outdoor}
          </div>
        </details>
      </div>
    </div>
  );
};
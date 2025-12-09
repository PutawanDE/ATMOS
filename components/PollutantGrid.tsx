
import React from "react";
import { CurrentAirQuality } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface PollutantGridProps {
  data: CurrentAirQuality;
}

interface PollutantCardProps {
  title: string;
  value: number;
  unit: string;
  desc: string;
  levelColor: string;
  levelText: string;
}

const PollutantCard = ({ title, value, unit, desc, levelColor, levelText }: PollutantCardProps) => (
  <div className="flex flex-col p-4 md:p-6 border-2 border-black bg-white hover:bg-gray-50 transition-colors h-full justify-between">
    <div>
        <h3 className="font-bold text-sm md:text-lg uppercase tracking-wider mb-2">{title}</h3>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 min-h-[2.5rem]">{desc}</p>
    </div>
    <div className="mt-auto pt-2 flex items-baseline justify-between border-t-2 border-gray-100">
        <span className="font-mono text-xs md:text-base text-gray-500 font-bold pt-4">{value} <span className="text-[10px] md:text-xs font-normal opacity-70">{unit}</span></span>
        <span className={`font-black text-3xl md:text-5xl uppercase ${levelColor} pt-2`}>{levelText}</span>
    </div>
  </div>
);

const getLevel = (val: number, type: 'pm25' | 'o3' | 'no2' | 'pm10') => {
    // Simplified thresholds for demo
    if (type === 'pm25') {
        if (val > 55) return { text: 'HIGH', color: 'text-aqi-unhealthy' };
        if (val > 35) return { text: 'MOD', color: 'text-aqi-moderate' };
        return { text: 'LOW', color: 'text-aqi-good' };
    }
    // Defaults
    if (val > 100) return { text: 'HIGH', color: 'text-aqi-unhealthy' };
    if (val > 50) return { text: 'MOD', color: 'text-aqi-moderate' };
    return { text: 'LOW', color: 'text-aqi-good' };
}

export const PollutantGrid: React.FC<PollutantGridProps> = ({ data }) => {
  const { t } = useLanguage();
  const pm25Level = getLevel(data.pm2_5, 'pm25');
  const o3Level = getLevel(data.ozone, 'o3');
  const pm10Level = getLevel(data.pm10, 'pm10');
  const no2Level = getLevel(data.nitrogen_dioxide, 'no2');

  return (
    <div className="bg-white p-6 border-2 border-black shadow-brutalist h-full">
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider mb-6">{t.whatsInTheAir}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <PollutantCard
          title={t.fineParticles}
          value={data.pm2_5}
          unit="μg/m³"
          desc={t.fineParticlesDesc}
          levelText={pm25Level.text}
          levelColor={pm25Level.color}
        />
        <PollutantCard
          title={t.ozone}
          value={data.ozone}
          unit="μg/m³"
          desc={t.ozoneDesc}
          levelText={o3Level.text}
          levelColor={o3Level.color}
        />
        <PollutantCard
          title={t.coarseParticles}
          value={data.pm10}
          unit="μg/m³"
          desc={t.coarseParticlesDesc}
          levelText={pm10Level.text}
          levelColor={pm10Level.color}
        />
        <PollutantCard
          title={t.nitrogenDioxide}
          value={data.nitrogen_dioxide}
          unit="μg/m³"
          desc={t.nitrogenDioxideDesc}
          levelText={no2Level.text}
          levelColor={no2Level.color}
        />
      </div>
    </div>
  );
};

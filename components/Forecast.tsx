
import React from "react";
import { DailyForecast } from "../types";
import { format, parseISO } from "date-fns";
import { GET_AQI_META } from "../constants";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import { useLanguage } from "../context/LanguageContext";

interface ForecastProps {
  data: DailyForecast;
}

export const Forecast: React.FC<ForecastProps> = ({ data }) => {
  const { language, t } = useLanguage();
  
  const chartData = data.time.map((t, i) => ({
    day: format(parseISO(t), "EEE"),
    aqi: data.us_aqi_max[i],
  }));

  return (
    <div className="bg-white p-6 border-2 border-black shadow-brutalist mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-end mb-6 border-b-2 border-black pb-4">
        <h2 className="text-xl font-black uppercase tracking-wider">{t.forecastTitle}</h2>
        <span className="text-xs font-mono text-gray-500 uppercase">{t.forecastSubtitle}</span>
      </div>

      {/* Desktop Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {data.time.map((dateStr, idx) => {
          const aqi = data.us_aqi_max[idx];
          const meta = GET_AQI_META(aqi, language);
          const isToday = idx === 0;
          
          // Simple manual day mapping to avoid heavy locale imports for now
          const dayIndex = parseISO(dateStr).getDay();
          const dayName = t.days[dayIndex];
          
          return (
            <div 
                key={dateStr} 
                className={`flex flex-col items-center justify-center p-3 border-2 border-black transition-transform hover:-translate-y-1 ${isToday ? `${meta.color} text-white` : 'bg-white'}`}
            >
              <span className="text-xs font-bold uppercase mb-2">
                {isToday ? t.today : dayName}
              </span>
              <span className={`material-symbols-outlined text-3xl mb-1 ${isToday ? 'text-white' : meta.textColor}`}>
                {meta.icon}
              </span>
              <span className={`text-3xl font-black ${isToday ? 'text-white' : meta.textColor}`}>{aqi}</span>
              <span className="text-[10px] uppercase font-bold mt-1 opacity-70">{meta.translatedLevel}</span>
            </div>
          );
        })}
      </div>

      {/* Recharts Mini Trend */}
      <div className="h-32 w-full opacity-50 hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Tooltip 
                    contentStyle={{ border: '2px solid black', borderRadius: '0px', boxShadow: '4px 4px 0px #000' }}
                    itemStyle={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="aqi" stroke="#000" strokeWidth={3} fillOpacity={1} fill="url(#colorAqi)" />
            </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

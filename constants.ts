
import { AQILevel, AQIMeta } from "./types";
import { translations, Language } from "./translations";

export const DEFAULT_LOCATION = {
  name: "Bangkok",
  latitude: 13.7563,
  longitude: 100.5018,
  admin1: "Bangkok",
  country: "Thailand",
};

export const CIGARETTE_FACTOR = 22; // Roughly 22ug/m3 of PM2.5 = 1 cigarette

export const GET_AQI_META = (aqi: number, lang: Language = 'en'): AQIMeta => {
  const t = translations[lang];

  if (aqi <= 50) {
    return {
      level: AQILevel.GOOD,
      color: "bg-aqi-good",
      textColor: "text-aqi-good",
      emoji: "🙂",
      icon: "sentiment_very_satisfied",
      description: t.aqiDesc.good,
      mainConcern: t.aqiLevels.good, // Using level name as placeholder if concern not translated differently
      translatedLevel: t.aqiLevels.good
    };
  } else if (aqi <= 100) {
    return {
      level: AQILevel.MODERATE,
      color: "bg-aqi-moderate",
      textColor: "text-aqi-moderate",
      emoji: "😐",
      icon: "sentiment_neutral",
      description: t.aqiDesc.moderate,
      mainConcern: "Ozone / PM2.5",
      translatedLevel: t.aqiLevels.moderate
    };
  } else if (aqi <= 150) {
    return {
      level: AQILevel.SENSITIVE,
      color: "bg-aqi-sensitive",
      textColor: "text-aqi-sensitive",
      emoji: "😷",
      icon: "sentiment_dissatisfied",
      description: t.aqiDesc.sensitive,
      mainConcern: "PM2.5",
      translatedLevel: t.aqiLevels.sensitive
    };
  } else if (aqi <= 200) {
    return {
      level: AQILevel.UNHEALTHY,
      color: "bg-aqi-unhealthy",
      textColor: "text-aqi-unhealthy",
      emoji: "💀",
      icon: "skull",
      description: t.aqiDesc.unhealthy,
      mainConcern: `${t.fineParticles.split('(')[0]} (PM2.5)`,
      translatedLevel: t.aqiLevels.unhealthy
    };
  } else if (aqi <= 300) {
    return {
      level: AQILevel.VERY_UNHEALTHY,
      color: "bg-aqi-very-unhealthy",
      textColor: "text-aqi-very-unhealthy",
      emoji: "☠️",
      icon: "skull",
      description: t.aqiDesc.veryUnhealthy,
      mainConcern: "PM2.5",
      translatedLevel: t.aqiLevels.veryUnhealthy
    };
  } else {
    return {
      level: AQILevel.HAZARDOUS,
      color: "bg-aqi-hazardous",
      textColor: "text-aqi-hazardous",
      emoji: "☣️",
      icon: "warning",
      description: t.aqiDesc.hazardous,
      mainConcern: "Everything",
      translatedLevel: t.aqiLevels.hazardous
    };
  }
};
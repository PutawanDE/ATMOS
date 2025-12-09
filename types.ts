
export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string; // State/Province
  country?: string;
  isCurrentLocation?: boolean;
}

export interface CurrentAirQuality {
  us_aqi: number;
  pm2_5: number;
  pm10: number;
  nitrogen_dioxide: number;
  ozone: number;
  uv_index: number;
}

export interface DailyForecast {
  time: string[];
  us_aqi_max: number[];
  uv_index_max: number[];
}

export interface AirQualityData {
  current: CurrentAirQuality;
  daily: DailyForecast;
  hourly: {
    time: string[];
    pm2_5: number[];
  };
}

export enum AQILevel {
  GOOD = "Good",
  MODERATE = "Moderate",
  SENSITIVE = "Sensitive",
  UNHEALTHY = "Unhealthy",
  VERY_UNHEALTHY = "Very Unhealthy",
  HAZARDOUS = "Hazardous",
}

export interface AQIMeta {
  level: AQILevel;
  translatedLevel: string;
  color: string;
  textColor: string;
  emoji: string;
  icon: string;
  description: string;
  mainConcern: string;
}

export interface HealthTipSet {
  everyone: string;
  sensitive: string;
  outdoor: string;
}

export interface GeminiHealthInsight {
  summary: string;
}

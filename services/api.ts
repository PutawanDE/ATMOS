import { AirQualityData, GeoLocation } from "../types";

// OpenStreetMap Nominatim API for better multilingual support
const GEOCODING_URL = "https://nominatim.openstreetmap.org/search";
const REVERSE_GEOCODING_URL = "https://nominatim.openstreetmap.org/reverse";
const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

interface NominatimAddress {
  city?: string;
  town?: string;
  village?: string;
  hamlet?: string;
  suburb?: string;
  municipality?: string;
  state?: string;
  region?: string;
  province?: string;
  country?: string;
}

interface NominatimItem {
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
  address?: NominatimAddress;
}

export const searchLocation = async (query: string, lang: string = 'en'): Promise<GeoLocation[]> => {
  try {
    const params = new URLSearchParams({
        q: query,
        format: "json",
        addressdetails: "1",
        limit: "5",
        "accept-language": lang // Crucial for Thai results
    });

    const res = await fetch(`${GEOCODING_URL}?${params.toString()}`, {
        headers: {
            // Nominatim requires a User-Agent to prevent blocking
            "User-Agent": "AtmosDashboard/1.0"
        }
    });
    
    const data = await res.json();
    
    if (!Array.isArray(data)) return [];

    return data.map((item: NominatimItem) => {
      const addr = item.address || {};
      
      // Nominatim returns detailed address parts; we try to find the most relevant "City" name
      const name = addr.city || addr.town || addr.village || addr.hamlet || addr.suburb || item.name || item.display_name.split(',')[0];
      
      return {
        name: name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        admin1: addr.state || addr.region || addr.province || "",
        country: addr.country || "",
      };
    });
  } catch (error) {
    console.error("Error searching location:", error);
    return [];
  }
};

export const getReverseGeocoding = async (lat: number, lon: number, lang: string = 'en'): Promise<GeoLocation | null> => {
  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      format: "json",
      addressdetails: "1",
      "accept-language": lang
    });

    const res = await fetch(`${REVERSE_GEOCODING_URL}?${params.toString()}`, {
      headers: {
        "User-Agent": "AtmosDashboard/1.0"
      }
    });

    if (!res.ok) return null;
    const data = await res.json();
    
    if (!data || !data.address) return null;

    const addr = data.address;
    const name = addr.city || addr.town || addr.village || addr.hamlet || addr.suburb || addr.municipality || data.name || "Unknown Location";

    return {
      name: name,
      latitude: lat,
      longitude: lon,
      admin1: addr.state || addr.region || addr.province || "",
      country: addr.country || "",
    };
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return null;
  }
};

export const getAirQualityData = async (lat: number, lon: number): Promise<AirQualityData | null> => {
  try {
    // Note: us_aqi_max is not a valid daily parameter in Open-Meteo.
    // We must fetch hourly us_aqi and calculate the daily max.
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      current: "us_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,uv_index",
      hourly: "pm2_5,us_aqi", // Fetch hourly AQI to aggregate later
      daily: "uv_index_max",
      timezone: "auto",
      forecast_days: "5"
    });

    const res = await fetch(`${AIR_QUALITY_URL}?${params.toString()}`);
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
    }
    const data = await res.json();

    if (!data.current) return null;

    // Aggregate hourly US AQI to find daily max
    // We assume 24 hourly data points per day.
    const dailyMaxAqi: number[] = [];
    const dailyTime: string[] = [];
    
    if (data.hourly && data.hourly.us_aqi) {
        const days = 5;
        for (let i = 0; i < days; i++) {
            const start = i * 24;
            const end = start + 24;
            // Ensure we don't go out of bounds
            if (start < data.hourly.us_aqi.length) {
                const daySlice = data.hourly.us_aqi.slice(start, Math.min(end, data.hourly.us_aqi.length));
                if (daySlice.length > 0) {
                    const max = Math.max(...daySlice);
                    dailyMaxAqi.push(max);
                    // Use the date from the start of the chunk
                    dailyTime.push(data.hourly.time[start]);
                }
            }
        }
    }

    // Fallback if calculation failed, though it shouldn't with correct API response
    // Add check for data.daily existence to prevent crash on partial data
    const apiDailyTime = data.daily?.time || [];
    const finalDailyTime = dailyTime.length > 0 ? dailyTime : apiDailyTime;
    const finalDailyAqi = dailyMaxAqi.length > 0 ? dailyMaxAqi : new Array(finalDailyTime.length).fill(0);

    return {
      current: data.current,
      daily: {
          time: finalDailyTime,
          us_aqi_max: finalDailyAqi,
          uv_index_max: data.daily?.uv_index_max || []
      },
      hourly: data.hourly
    };
  } catch (error) {
    console.error("Error fetching AQI data:", error);
    return null;
  }
};
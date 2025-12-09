import React, { useEffect, useState, useCallback, useRef } from "react";
import { Header } from "./components/Header";
import { AQIMainCard } from "./components/AQIMainCard";
import { HealthTips } from "./components/HealthTips";
import { PollutantGrid } from "./components/PollutantGrid";
import { CigaretteCounter } from "./components/CigaretteCounter";
import { Forecast } from "./components/Forecast";
import { About } from "./components/About";
import { getAirQualityData, getReverseGeocoding } from "./services/api";
import { AirQualityData, GeoLocation } from "./types";
import { DEFAULT_LOCATION } from "./constants";
import { useLanguage } from "./context/LanguageContext";

type ViewState = 'home' | 'about';

const App: React.FC = () => {
  const [location, setLocation] = useState<GeoLocation>(DEFAULT_LOCATION);
  const [data, setData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewState>('home');
  const { t, language } = useLanguage();
  
  // Track if we have already performed the initial load to preventing re-running
  const hasInitialized = useRef(false);

  const fetchData = useCallback(async (loc: GeoLocation) => {
    setLoading(true);
    const result = await getAirQualityData(loc.latitude, loc.longitude);
    setData(result);
    setLoading(false);
  }, []);

  const handleUseCurrentLocation = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
        if (!("geolocation" in navigator)) {
            console.warn("Geolocation not supported");
            reject("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                // Try to resolve the actual name of the location
                const resolvedLoc = await getReverseGeocoding(position.coords.latitude, position.coords.longitude, language);
                
                const newLoc = {
                    name: resolvedLoc ? resolvedLoc.name : t.currentLocation,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    admin1: resolvedLoc?.admin1 || "",
                    country: resolvedLoc?.country || "",
                    isCurrentLocation: true
                };
                
                setLocation(newLoc);
                // We don't await this because we want to resolve the location finding immediately
                // The main loading state will take over for the data fetch
                fetchData(newLoc); 
                resolve();
            },
            (error) => {
                console.warn("Geolocation error:", error);
                reject(error);
            }
        );
    });
  }, [language, t, fetchData]);

  // Initial Load
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    let geoTimeout: ReturnType<typeof setTimeout>;

    const fetchDefault = () => {
        console.log("Geolocation timed out or denied, fetching default location.");
        fetchData(DEFAULT_LOCATION);
    };

    // 5 second timeout for user to accept/deny location on initial load
    geoTimeout = setTimeout(fetchDefault, 5000);

    handleUseCurrentLocation()
        .then(() => {
            clearTimeout(geoTimeout);
        })
        .catch(() => {
            clearTimeout(geoTimeout);
            fetchDefault();
        });

    return () => clearTimeout(geoTimeout);
  }, [handleUseCurrentLocation, fetchData]);

  const handleLocationSelect = (newLoc: GeoLocation) => {
    setLocation(newLoc);
    fetchData(newLoc);
  };

  const displayLocationName = location.name;

  return (
    <div className="min-h-screen flex flex-col font-display text-black pb-12">
      <Header 
        onLocationSelect={handleLocationSelect} 
        currentLocationName={displayLocationName} 
        onNavigate={setView}
        onUseCurrentLocation={handleUseCurrentLocation}
      />

      <main className="container mx-auto px-4 py-8 flex-1">
        {view === 'about' ? (
            <About onBack={() => setView('home')} />
        ) : loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-6xl animate-spin">autorenew</span>
                <div className="text-2xl font-black animate-pulse uppercase">{t.loading}</div>
            </div>
          </div>
        ) : data && data.current ? (
          <div className="flex flex-col gap-8">
            
            <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-4 mb-4">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-3">
                    {location.isCurrentLocation && (
                        <span className="material-symbols-outlined text-4xl md:text-6xl text-blue-600 animate-pulse" title={t.currentLocation}>
                            my_location
                        </span>
                    )}
                    <span>{displayLocationName}</span>
                    <span className="text-lg md:text-2xl ml-2 text-gray-500 font-mono align-middle hidden sm:inline-block">
                        {location.admin1 && `${location.admin1}`}
                    </span>
                </h1>
                <span className="font-mono text-xs font-bold bg-yellow-400 px-2 py-1 border-2 border-black shadow-brutalist-sm transform inline-block rotate-2">
                    {t.liveData}
                </span>
            </div>

            {/* Top Grid: Main Score | Health Tips | Forecast Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <AQIMainCard 
                    aqi={data.current.us_aqi} 
                    locationName={location.name} 
                    onNavigate={() => setView('about')}
                />
              </div>
              <div className="lg:col-span-1">
                {/* Passed AQI directly to HealthTips for static instant lookup */}
                <HealthTips aqi={data.current.us_aqi} />
              </div>
               <div className="lg:col-span-1">
                <CigaretteCounter pm25={data.current.pm2_5} />
              </div>
            </div>

            {/* Middle Section: Details & Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-3">
                 <PollutantGrid data={data.current} />
               </div>
            </div>

            {/* Bottom: Forecast */}
            <Forecast data={data.daily} />

          </div>
        ) : (
            <div className="text-center py-20 border-2 border-black border-dashed bg-gray-100">
                <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
                <h2 className="text-3xl font-black uppercase text-red-600 mb-2">{t.errorTitle}</h2>
                <p className="font-mono mb-6">{t.errorDesc}</p>
                <button 
                    onClick={() => fetchData(location)} 
                    className="px-8 py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 shadow-brutalist transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                    {t.retry}
                </button>
            </div>
        )}
      </main>

      <footer className="container mx-auto px-4 pt-8 border-t-2 border-gray-300 mt-8 text-center text-gray-500 text-xs font-mono uppercase">
        <p>&copy; {new Date().getFullYear()} {t.footer}</p>
      </footer>
    </div>
  );
};

export default App;
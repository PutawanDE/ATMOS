import React, { useState, useEffect, useRef } from "react";
import { GeoLocation } from "../types";
import { searchLocation } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  onLocationSelect: (loc: GeoLocation) => void;
  currentLocationName: string;
  onNavigate: (view: 'home' | 'about') => void;
  onUseCurrentLocation: () => Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({ onLocationSelect, currentLocationName, onNavigate, onUseCurrentLocation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const locs = await searchLocation(searchQuery, language);
    setResults(locs);
    setIsSearching(false);
  };

  const handleCurrentLocationClick = async () => {
    setIsLocating(true);
    try {
        await onUseCurrentLocation();
        setSearchQuery(""); // Clear search query if successful
        onNavigate('home');
    } catch (error) {
        console.error("Failed to get location", error);
    } finally {
        setIsLocating(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-black">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
            className="flex items-center gap-2 select-none cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate('home')}
        >
          <span className="material-symbols-outlined text-4xl text-red-600 font-black">air</span>
          <h1 className="text-xl font-black uppercase tracking-tight hidden sm:block">
            {t.title}
          </h1>
        </div>

        {/* Search Section: Explicit h-10 to match buttons */}
        <div className="flex-1 max-w-md mx-4 h-10 relative z-10" ref={searchRef}>
          <form 
            onSubmit={handleSearch} 
            className="flex items-center w-full h-full shadow-brutalist-sm focus-within:shadow-brutalist transition-all"
          >
            <div className="relative flex-1 h-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  type="text"
                  aria-label={t.searchPlaceholder}
                  className="w-full h-full p-2 pl-10 text-sm text-gray-900 border-2 border-black border-r-0 bg-gray-50 focus:outline-none placeholder-gray-500 font-mono uppercase transition-colors rounded-none"
                  placeholder={currentLocationName || t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Current Location Button */}
            <button
                type="button"
                onClick={handleCurrentLocationClick}
                className="h-full w-10 flex items-center justify-center border-2 border-black border-r-0 bg-gray-100 hover:bg-gray-200 transition-colors"
                title={t.currentLocation}
                disabled={isLocating}
            >
                <span className={`material-symbols-outlined text-gray-700 ${isLocating ? 'animate-spin' : ''}`}>
                    {isLocating ? 'autorenew' : 'my_location'}
                </span>
            </button>

            {/* Search Submit Button */}
            <button 
                type="submit"
                className="h-full px-4 bg-yellow-400 border-2 border-black font-bold uppercase text-xs hover:bg-yellow-500 transition-colors whitespace-nowrap"
            >
                {isSearching ? "..." : t.searchButton}
            </button>
          </form>

          {results.length > 0 && (
            <ul className="absolute top-full left-0 z-50 w-full mt-1 bg-white border-2 border-black shadow-brutalist max-h-60 overflow-y-auto">
              {results.map((loc, idx) => (
                <li
                  key={`${loc.latitude}-${idx}`}
                  className="px-4 py-2 hover:bg-yellow-100 cursor-pointer border-b border-black last:border-b-0 flex flex-col"
                  onClick={() => {
                    onLocationSelect(loc);
                    setResults([]);
                    setSearchQuery("");
                    onNavigate('home');
                  }}
                >
                  <span className="font-bold uppercase text-sm">{loc.name}</span>
                  <span className="text-xs text-gray-500 font-mono">{loc.admin1}, {loc.country}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4">
            <button 
                onClick={toggleLanguage}
                className="h-10 w-10 flex items-center justify-center border-2 border-black font-black text-sm bg-white hover:bg-gray-100 shadow-brutalist-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
                {language.toUpperCase()}
            </button>
            
            <div className="hidden md:flex h-10 items-center">
                <button 
                    onClick={() => onNavigate('about')}
                    className="h-full px-6 bg-black text-white font-bold uppercase text-sm hover:bg-gray-800 transition-colors shadow-brutalist-sm border-2 border-transparent flex items-center"
                >
                    {t.about}
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};
import React, { useState, useEffect } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { MusicPlayer } from './components/MusicPlayer';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { weatherService } from './services/weatherService';
import { musicService } from './services/musicService';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useGeolocation } from './hooks/useGeolocation';
import { getWeatherBackgroundImage, isDay } from './utils/weatherUtils';
import { WeatherData, ForecastData } from './types/weather';

// PWA Install prompt
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favoriteCity, setFavoriteCity] = useLocalStorage<string>('favoriteCity', '');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  
  const { position, error: geoError, loading: geoLoading } = useGeolocation();

  const currentWeatherMain = weather?.weather[0]?.main || 'Clear';
  const isDayTime = weather ? isDay(weather.sys.sunrise, weather.sys.sunset) : true;
  const backgroundImage = getWeatherBackgroundImage(currentWeatherMain, isDayTime);
  const musicTracks = musicService.getPlaylistByWeather(currentWeatherMain);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      setFavoriteCity(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar dados do tempo');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!position) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getWeatherByCoords(position.lat, position.lon),
        weatherService.getForecastByCoords(position.lat, position.lon)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      setFavoriteCity(weatherData.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar dados da localização');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (favoriteCity) {
      fetchWeatherData(favoriteCity);
    } else if (position) {
      fetchWeatherByLocation();
    }
  };

  // Load favorite city or use geolocation on initial load
  useEffect(() => {
    if (favoriteCity) {
      fetchWeatherData(favoriteCity);
    } else if (position && !geoLoading) {
      fetchWeatherByLocation();
    }
  }, [position, geoLoading]);

  // Debug: Log background image URL
  useEffect(() => {
    if (weather) {
      console.log('Weather condition:', currentWeatherMain);
      console.log('Is day time:', isDayTime);
      console.log('Background image URL:', backgroundImage);
    }
  }, [weather, currentWeatherMain, isDayTime, backgroundImage]);

  // PWA Install prompt handling
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  return (
    <div 
      className="min-h-screen transition-all duration-1000 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Additional overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]"></div>
      
      <div className="relative min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* PWA Install Banner */}
          {showInstallPrompt && (
            <div className="fixed top-4 left-4 right-4 z-50 bg-black/80 backdrop-blur-lg rounded-2xl p-4 text-white border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Instalar WeatherTunes</h3>
                  <p className="text-sm text-white/80">Adicione à tela inicial para acesso rápido</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setShowInstallPrompt(false)}
                    className="px-3 py-1 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    Agora não
                  </button>
                  <button
                    onClick={handleInstallClick}
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Instalar
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-2xl">
              WeatherTunes
            </h1>
            <p className="text-white/90 text-lg drop-shadow-lg">
              Previsão do tempo com trilha sonora perfeita
            </p>
          </div>

          <SearchBar
            onSearch={fetchWeatherData}
            loading={loading || geoLoading}
            onLocationRequest={fetchWeatherByLocation}
          />

          {loading && <LoadingSpinner message="Buscando dados do tempo..." />}
          
          {error && !loading && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}

          {weather && forecast && !loading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <WeatherCard weather={weather} />
                <ForecastCard forecast={forecast} />
              </div>
              
              <div className="lg:col-span-1">
                <MusicPlayer tracks={musicTracks} weatherMain={currentWeatherMain} />
              </div>
            </div>
          )}

          {!weather && !loading && !error && (
            <div className="text-center text-white py-12">
              <p className="text-xl mb-4 drop-shadow-lg">
                Digite o nome de uma cidade para começar
              </p>
              <p className="text-white/80 drop-shadow-lg">
                Ou permita o acesso à localização para dados automáticos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { MapPin, Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon, formatTime, capitalizeFirst, getCityImage } from '../utils/weatherUtils';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const currentWeather = weather.weather[0];
  
  const getLocationDisplay = () => {
    if (weather.state) {
      return `${weather.name}, ${weather.state}`;
    }
    return `${weather.name}, ${weather.sys.country}`;
  };
  
  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-8 text-white shadow-2xl border border-white/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-white/90" />
          <h2 className="text-xl font-semibold">{getLocationDisplay()}</h2>
        </div>
        <div className="text-4xl drop-shadow-lg">
          {getWeatherIcon(currentWeather.main)}
        </div>
      </div>

      {/* City Image Section */}
      <div className="mb-6">
        <div className="relative w-full h-32 rounded-2xl overflow-hidden">
          <img
            src={getCityImage(weather.name, weather.sys.country)}
            alt={`Vista de ${weather.name}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to a generic city image if specific city image fails
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-3 left-3 text-white">
            <div className="text-sm font-medium drop-shadow-lg">
              Vista de {weather.name}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="text-6xl font-light mb-2 drop-shadow-lg">
          {Math.round(weather.main.temp)}°C
        </div>
        <div className="text-xl text-white/90 mb-2 drop-shadow-lg">
          {capitalizeFirst(currentWeather.description)}
        </div>
        <div className="text-sm text-white/80 drop-shadow-lg">
          Sensação térmica: {Math.round(weather.main.feels_like)}°C
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Thermometer className="w-5 h-5 text-white/80" />
            <div>
              <div className="text-sm text-white/80">Mín/Máx</div>
              <div className="font-semibold">
                {Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Droplets className="w-5 h-5 text-white/80" />
            <div>
              <div className="text-sm text-white/80">Umidade</div>
              <div className="font-semibold">{weather.main.humidity}%</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Wind className="w-5 h-5 text-white/80" />
            <div>
              <div className="text-sm text-white/80">Vento</div>
              <div className="font-semibold">{weather.wind.speed} m/s</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Gauge className="w-5 h-5 text-white/80" />
            <div>
              <div className="text-sm text-white/80">Pressão</div>
              <div className="font-semibold">{weather.main.pressure} hPa</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/30 flex justify-between text-sm text-white/80">
        <div>Nascer do Sol: {formatTime(weather.sys.sunrise)}</div>
        <div>Pôr do Sol: {formatTime(weather.sys.sunset)}</div>
      </div>
    </div>
  );
};
import React from 'react';
import { Calendar } from 'lucide-react';
import { ForecastData } from '../types/weather';
import { getWeatherIcon, formatDate } from '../utils/weatherUtils';

interface ForecastCardProps {
  forecast: ForecastData;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  // Group forecast by day (take one per day at noon)
  const dailyForecast = forecast.list.filter((item, index) => 
    index === 0 || item.dt_txt.includes('12:00:00')
  ).slice(0, 5);

  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 text-white shadow-2xl border border-white/30">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-5 h-5 text-white/90" />
        <h3 className="text-lg font-semibold">Próximos 5 Dias</h3>
      </div>
      
      <div className="space-y-4">
        {dailyForecast.map((day, index) => (
          <div key={day.dt} className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="text-2xl drop-shadow-lg">
                {getWeatherIcon(day.weather[0].main)}
              </div>
              <div>
                <div className="font-medium">
                  {index === 0 ? 'Hoje' : formatDate(day.dt)}
                </div>
                <div className="text-sm text-white/80">
                  {day.weather[0].description}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-lg">
                {Math.round(day.main.temp)}°
              </div>
              <div className="text-sm text-white/80">
                {Math.round(day.main.temp_min)}° / {Math.round(day.main.temp_max)}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { Calendar } from 'lucide-react';
import { ForecastData } from '../types/weather';
import { getWeatherIcon, formatDate } from '../utils/weatherUtils';

interface ForecastCardProps {
  forecast: ForecastData;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  // Group forecast by day and calculate real min/max temperatures
  const getDailyForecast = () => {
    const dailyData: { [key: string]: any[] } = {};
    
    // Group by date
    forecast.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });
    
    // Calculate min/max for each day and get representative data
    return Object.entries(dailyData).slice(0, 5).map(([date, items]) => {
      const temps = items.map(item => item.main.temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      
      // Use noon data as representative, or first available
      const representative = items.find(item => item.dt_txt.includes('12:00:00')) || items[0];
      
      return {
        ...representative,
        calculatedMin: minTemp,
        calculatedMax: maxTemp,
        date: date
      };
    });
  };
  
  const dailyForecast = getDailyForecast();

  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 text-white shadow-2xl border border-white/30">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-5 h-5 text-white/90" />
        <h3 className="text-lg font-semibold">Próximos 5 Dias</h3>
      </div>
      
      <div className="space-y-4">
        {dailyForecast.map((day, index) => (
          <div key={day.date} className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
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
                Mín: {Math.round(day.calculatedMin)}°
              </div>
              <div className="text-sm text-white/80">
                Máx: {Math.round(day.calculatedMax)}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
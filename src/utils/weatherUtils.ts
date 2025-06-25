export const getWeatherBackground = (weatherMain: string, isDay: boolean = true): string => {
  const backgrounds = {
    Clear: isDay 
      ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-orange-400'
      : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900',
    Clouds: isDay
      ? 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600'
      : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900',
    Rain: 'bg-gradient-to-br from-gray-600 via-slate-700 to-blue-800',
    Drizzle: 'bg-gradient-to-br from-gray-500 via-slate-600 to-blue-700',
    Thunderstorm: 'bg-gradient-to-br from-gray-800 via-slate-800 to-purple-900',
    Snow: 'bg-gradient-to-br from-gray-200 via-blue-100 to-blue-300',
    Mist: 'bg-gradient-to-br from-gray-300 via-gray-400 to-blue-400',
    Fog: 'bg-gradient-to-br from-gray-300 via-gray-400 to-blue-400',
    Haze: 'bg-gradient-to-br from-yellow-300 via-orange-300 to-red-400'
  };

  return backgrounds[weatherMain as keyof typeof backgrounds] || backgrounds.Clear;
};

export const getWeatherBackgroundImage = (weatherMain: string, isDay: boolean = true): string => {
  const images = {
    Clear: isDay 
      ? 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
      : 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    Clouds: isDay
      ? 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
      : 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    Rain: 'https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    Drizzle: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    Thunderstorm: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    Snow: 'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    Mist: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    Fog: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    Haze: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  };

  return images[weatherMain as keyof typeof images] || images.Clear;
};

export const getCityImage = (cityName: string, country: string): string => {
  // Database of famous cities and their representative images
  const cityImages: { [key: string]: string } = {
    // Brazil
    'São Paulo': 'https://images.pexels.com/photos/161901/sao-paulo-brazil-skyline-skyscrapers-161901.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Rio de Janeiro': 'https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Brasília': 'https://images.pexels.com/photos/2363/brazil-brasilia-congress-building.jpg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Salvador': 'https://images.pexels.com/photos/2363/brazil-brasilia-congress-building.jpg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Fortaleza': 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Belo Horizonte': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Manaus': 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Curitiba': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Recife': 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Porto Alegre': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Petrolina': 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    
    // International Cities
    'New York': 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'London': 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Paris': 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Tokyo': 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Sydney': 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Dubai': 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Barcelona': 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Rome': 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Amsterdam': 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Berlin': 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Madrid': 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Lisbon': 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Buenos Aires': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Mexico City': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Los Angeles': 'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Chicago': 'https://images.pexels.com/photos/1823680/pexels-photo-1823680.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Miami': 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Las Vegas': 'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Singapore': 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Hong Kong': 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Seoul': 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Bangkok': 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Mumbai': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Delhi': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Cairo': 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Istanbul': 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Moscow': 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Cape Town': 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'Lagos': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop'
  };

  // Try to find exact city match first
  if (cityImages[cityName]) {
    return cityImages[cityName];
  }

  // Try to find partial matches for compound city names
  const cityKey = Object.keys(cityImages).find(key => 
    key.toLowerCase().includes(cityName.toLowerCase()) || 
    cityName.toLowerCase().includes(key.toLowerCase())
  );

  if (cityKey) {
    return cityImages[cityKey];
  }

  // Country-based fallback images
  const countryImages: { [key: string]: string } = {
    'BR': 'https://images.pexels.com/photos/161901/sao-paulo-brazil-skyline-skyscrapers-161901.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'US': 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'GB': 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'FR': 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'JP': 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'AU': 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'AE': 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'ES': 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'IT': 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'NL': 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    'DE': 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop'
  };

  // Return country-based image or generic city image
  return countryImages[country] || 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop';
};

export const getWeatherIcon = (weatherMain: string): string => {
  const icons = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Fog: '🌫️',
    Haze: '🌅'
  };

  return icons[weatherMain as keyof typeof icons] || '☀️';
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
};

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isDay = (sunrise: number, sunset: number, current: number = Date.now() / 1000): boolean => {
  return current >= sunrise && current <= sunset;
};
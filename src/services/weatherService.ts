const API_KEY = '05386a7d92ad12b676498933be32d2f9';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const weatherService = {
  async getCurrentWeather(city: string) {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&lang=pt_br&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Cidade não encontrada');
    }
    
    const data = await response.json();
    
    // Get state information using reverse geocoding
    try {
      const geoResponse = await fetch(
        `${GEO_URL}/reverse?lat=${data.coord.lat}&lon=${data.coord.lon}&limit=1&appid=${API_KEY}`
      );
      
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.length > 0) {
          data.state = geoData[0].state;
        }
      }
    } catch (error) {
      console.warn('Could not fetch state information:', error);
    }
    
    return data;
  },

  async getWeatherByCoords(lat: number, lon: number) {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_br&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao obter dados de localização');
    }
    
    const data = await response.json();
    
    // Get state information using reverse geocoding
    try {
      const geoResponse = await fetch(
        `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.length > 0) {
          data.state = geoData[0].state;
        }
      }
    } catch (error) {
      console.warn('Could not fetch state information:', error);
    }
    
    return data;
  },

  async getForecast(city: string) {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&lang=pt_br&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao obter previsão');
    }
    
    return response.json();
  },

  async getForecastByCoords(lat: number, lon: number) {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_br&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Erro ao obter previsão de localização');
    }
    
    return response.json();
  }
};
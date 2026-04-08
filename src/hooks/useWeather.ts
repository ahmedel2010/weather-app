import { useState, useEffect } from 'react';
import { City, WeatherData } from '../types/weather.types';
import { fetchWeather } from '../services/weatherService';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather(selectedCity: City | null): UseWeatherReturn {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCity) return;

    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchWeather(selectedCity.lat, selectedCity.lon)
      .then((data) => {
        if (!cancelled) {
          setWeatherData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('تعذّر جلب بيانات الطقس. حاول مرة أخرى.');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedCity]);

  return { weatherData, loading, error };
}

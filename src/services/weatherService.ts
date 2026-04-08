import axios from 'axios';
import { WeatherData } from '../types/weather.types';

const API_KEY = 'f6abe6ad406546288ae28486dc3f2ed1';

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  const [currentRes, forecastRes] = await Promise.all([
    axios.get(currentWeatherUrl),
    axios.get(forecastUrl),
  ]);

  const currentTemp = Math.round(currentRes.data.main.temp - 272.15);
  const description = currentRes.data.weather[0].description as string;
  const icon = currentRes.data.weather[0].icon as string;
  const humidity = currentRes.data.main.humidity as number;
  const windSpeed = Math.round(currentRes.data.wind.speed * 3.6);
  const feelsLike = Math.round(currentRes.data.main.feels_like - 272.15);

  const todayDate = new Date().toISOString().slice(0, 10);
  const todayEntries = forecastRes.data.list.filter((entry: any) =>
    entry.dt_txt.startsWith(todayDate)
  );

  let tempMin: number;
  let tempMax: number;

  if (todayEntries.length > 0) {
    const temps = todayEntries.map((e: any) => Math.round(e.main.temp - 272.15));
    tempMin = Math.min(...temps);
    tempMax = Math.max(...temps);
  } else {
    const next8 = forecastRes.data.list.slice(0, 8);
    const temps = next8.map((e: any) => Math.round(e.main.temp - 272.15));
    tempMin = Math.min(...temps);
    tempMax = Math.max(...temps);
  }

  return {
    tempNumber: currentTemp,
    minTemp: tempMin,
    maxTemp: tempMax,
    description,
    icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
    humidity,
    windSpeed,
    feelsLike,
  };
}

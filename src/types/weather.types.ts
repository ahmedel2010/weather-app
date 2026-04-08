export interface City {
  nameAr: string;
  nameEn: string;
  lat: number;
  lon: number;
}

export interface Country {
  code: string;
  nameAr: string;
  nameEn: string;
  cities: City[];
}

export interface Continent {
  code: string;
  nameAr: string;
  nameEn: string;
  countries: Country[];
}

export interface WeatherData {
  tempNumber: number;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

import './styles/global.css';

import { ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/min/locales';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent } from '@mui/material/Select';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import theme from './config/theme';
import continentsData from './constants/continentsData';
import { useWeather } from './hooks/useWeather';
import { Continent, Country, City } from './types/weather.types';
import WeatherCard from './components/WeatherCard/WeatherCard';
import LocationSelector from './components/LocationSelector/LocationSelector';

const defaultContinent = continentsData[0];
const defaultCountry   = defaultContinent.countries[0];
const defaultCity      = defaultCountry.cities[0];

function App() {
  const { i18n } = useTranslation();

  const [locale, setLocale] = useState<string>('ar');
  const direction: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr';

  const [selectedContinent, setSelectedContinent] = useState<Continent>(defaultContinent);
  const [selectedCountry,   setSelectedCountry]   = useState<Country>(defaultCountry);
  const [selectedCity,      setSelectedCity]       = useState<City>(defaultCity);
  const [dateandtime,       setDateTime]           = useState<string>('');

  const { weatherData, loading, error } = useWeather(selectedCity);

  // ─── Clock ────────────────────────────────────────────────────────────────
  useEffect(() => {
    i18n.changeLanguage('ar');
    moment.locale('ar');
    setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));

    const timer = setInterval(() => {
      setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────────────
  function handleLangToggle(): void {
    const newLang = locale === 'ar' ? 'en' : 'ar';
    setLocale(newLang);
    i18n.changeLanguage(newLang);
    moment.locale(newLang);
  }

  function handleContinentChange(e: SelectChangeEvent<string>): void {
    const continent = continentsData.find((c) => c.code === e.target.value);
    if (!continent) return;
    setSelectedContinent(continent);
    setSelectedCountry(continent.countries[0]);
    setSelectedCity(continent.countries[0].cities[0]);
  }

  function handleCountryChange(e: SelectChangeEvent<string>): void {
    const country = selectedContinent.countries.find((c) => c.code === e.target.value);
    if (!country) return;
    setSelectedCountry(country);
    setSelectedCity(country.cities[0]);
  }

  function handleCityChange(e: SelectChangeEvent<string>): void {
    const city = selectedCountry.cities.find((c) => c.nameEn === e.target.value);
    if (!city) return;
    setSelectedCity(city);
  }

  const cityName    = locale === 'ar' ? selectedCity?.nameAr    : selectedCity?.nameEn;
  const countryName = locale === 'ar' ? selectedCountry?.nameAr : selectedCountry?.nameEn;

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '20px 0',
            }}
          >
            <LocationSelector
              continentsData={continentsData}
              selectedContinent={selectedContinent}
              selectedCountry={selectedCountry}
              selectedCity={selectedCity}
              locale={locale}
              direction={direction}
              onContinentChange={handleContinentChange}
              onCountryChange={handleCountryChange}
              onCityChange={handleCityChange}
            />

            <WeatherCard
              weatherData={weatherData}
              loading={loading}
              error={error}
              cityName={cityName ?? ''}
              countryName={countryName ?? ''}
              dateandtime={dateandtime}
              locale={locale}
              direction={direction}
            />

            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                direction: direction,
                marginTop: '14px',
              }}
            >
              <Button
                className="lang-btn"
                variant="outlined"
                onClick={handleLangToggle}
              >
                {locale === 'ar' ? 'English' : 'عربي'}
              </Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { WeatherData } from '../../types/weather.types';
import InfoChip from '../InfoChip/InfoChip';
import './WeatherCard.css';

interface WeatherCardProps {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  cityName: string;
  countryName: string;
  dateandtime: string;
  locale: string;
  direction: 'ltr' | 'rtl';
}

function WeatherCard({
  weatherData,
  loading,
  error,
  cityName,
  countryName,
  dateandtime,
  locale,
  direction,
}: WeatherCardProps) {
  const { t } = useTranslation();

  return (
    <div className="weather-card">
      {loading ? (
        <div className="weather-card__loader">
          <CircularProgress style={{ color: '#3b82f6' }} size={60} />
        </div>
      ) : error ? (
        <Typography
          variant="h6"
          style={{ color: '#ff6b6b', textAlign: 'center', padding: '40px 0' }}
        >
          {error}
        </Typography>
      ) : weatherData ? (
        <div dir={direction}>
          {/* Header */}
          <div className="weather-card__header">
            <div>
              <Typography
                variant="h3"
                style={{ fontWeight: '700', lineHeight: 1.1, color: '#f1f5f9' }}
              >
                {cityName}
              </Typography>
              <Typography
                variant="body2"
                style={{ color: '#64748b', marginTop: '4px', fontWeight: '600', fontSize: '13px' }}
              >
                {countryName}
              </Typography>
            </div>
            <Typography
              variant="body2"
              style={{
                color: '#475569',
                fontSize: '12px',
                textAlign: direction === 'rtl' ? 'left' : 'right',
              }}
            >
              {dateandtime}
            </Typography>
          </div>

          <div className="card-divider" />

          {/* Temperature */}
          <div className="weather-card__temp-row">
            <div className="weather-card__temp-left">
              <Typography
                variant="h1"
                style={{ fontWeight: '800', fontSize: '6rem', color: '#f1f5f9' }}
              >
                {weatherData.tempNumber}°
              </Typography>
              <img
                src={weatherData.icon}
                alt="weather icon"
                className="weather-card__icon"
              />
            </div>

            <div style={{ textAlign: direction === 'rtl' ? 'left' : 'right' }}>
              <Typography
                variant="h6"
                style={{
                  textTransform: 'capitalize',
                  color: '#cbd5e1',
                  fontWeight: '600',
                  marginBottom: '6px',
                }}
              >
                {t(weatherData.description) || weatherData.description}
              </Typography>
              <div
                className="weather-card__badges"
                style={{ justifyContent: direction === 'rtl' ? 'flex-end' : 'flex-start' }}
              >
                <span className="temp-badge min">↓ {weatherData.minTemp}°</span>
                <span className="temp-badge max">↑ {weatherData.maxTemp}°</span>
              </div>
            </div>
          </div>

          {/* Info Chips */}
          <div className="extra-info-row">
            <InfoChip
              icon="💧"
              label={locale === 'ar' ? 'الرطوبة' : 'Humidity'}
              value={`${weatherData.humidity}%`}
            />
            <InfoChip
              icon="💨"
              label={locale === 'ar' ? 'الرياح' : 'Wind'}
              value={`${weatherData.windSpeed} ${locale === 'ar' ? 'كم/س' : 'km/h'}`}
            />
            <InfoChip
              icon="🌡️"
              label={locale === 'ar' ? 'الإحساس' : 'Feels Like'}
              value={`${weatherData.feelsLike}°`}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default WeatherCard;

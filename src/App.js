import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import "moment/min/locales";
import { useTranslation } from 'react-i18next';

// Material UI components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

// --- بيانات الدول والمدن ---
const countriesData = [
  {
    code: "EG",
    nameAr: "مصر",
    nameEn: "Egypt",
    cities: [
      { nameAr: "القاهرة",       nameEn: "Cairo",          lat: 30.0626, lon: 31.2497 },
      { nameAr: "الإسكندرية",   nameEn: "Alexandria",      lat: 31.2001, lon: 29.9187 },
      { nameAr: "الجيزة",       nameEn: "Giza",            lat: 30.0131, lon: 31.2089 },
      { nameAr: "القليوبية",    nameEn: "Qalyubia",        lat: 30.4618, lon: 31.1841 },
      { nameAr: "الشرقية",      nameEn: "Sharqia",         lat: 30.5877, lon: 31.5021 },
      { nameAr: "الغربية",      nameEn: "Gharbia",         lat: 30.7865, lon: 30.9974 },
      { nameAr: "المنوفية",     nameEn: "Monufia",         lat: 30.5569, lon: 30.9625 },
      { nameAr: "البحيرة",      nameEn: "Beheira",         lat: 31.0343, lon: 30.4685 },
      { nameAr: "الدقهلية",     nameEn: "Dakahlia",        lat: 31.0409, lon: 31.3785 },
      { nameAr: "دمياط",        nameEn: "Damietta",        lat: 31.4165, lon: 31.8133 },
      { nameAr: "كفر الشيخ",   nameEn: "Kafr El-Sheikh",  lat: 31.1107, lon: 30.9388 },
      { nameAr: "الإسماعيلية",  nameEn: "Ismailia",        lat: 30.5965, lon: 32.2715 },
      { nameAr: "بورسعيد",      nameEn: "Port Said",       lat: 31.2565, lon: 32.2841 },
      { nameAr: "السويس",       nameEn: "Suez",            lat: 29.9668, lon: 32.5498 },
      { nameAr: "شمال سيناء",  nameEn: "North Sinai",     lat: 31.1302, lon: 33.7985 },
      { nameAr: "جنوب سيناء",  nameEn: "South Sinai",     lat: 28.5396, lon: 33.6128 },
      { nameAr: "الفيوم",       nameEn: "Faiyum",          lat: 29.3084, lon: 30.8428 },
      { nameAr: "بني سويف",    nameEn: "Beni Suef",       lat: 29.0661, lon: 31.0994 },
      { nameAr: "المنيا",       nameEn: "Minya",           lat: 28.0871, lon: 30.7618 },
      { nameAr: "أسيوط",       nameEn: "Asyut",           lat: 27.1809, lon: 31.1837 },
      { nameAr: "سوهاج",       nameEn: "Sohag",           lat: 26.5561, lon: 31.6948 },
      { nameAr: "قنا",          nameEn: "Qena",            lat: 26.1551, lon: 32.7160 },
      { nameAr: "الأقصر",      nameEn: "Luxor",           lat: 25.6872, lon: 32.6396 },
      { nameAr: "أسوان",       nameEn: "Aswan",           lat: 24.0889, lon: 32.8998 },
      { nameAr: "البحر الأحمر", nameEn: "Red Sea",         lat: 27.2579, lon: 33.8116 },
      { nameAr: "الوادي الجديد",nameEn: "New Valley",      lat: 25.4333, lon: 30.5500 },
      { nameAr: "مطروح",       nameEn: "Matrouh",         lat: 31.3543, lon: 27.2373 },
    ],
  },
  {
    code: "SA",
    nameAr: "المملكة العربية السعودية",
    nameEn: "Saudi Arabia",
    cities: [
      { nameAr: "الرياض", nameEn: "Riyadh", lat: 24.6877, lon: 46.7219 },
      { nameAr: "جدة", nameEn: "Jeddah", lat: 21.5433, lon: 39.1728 },
      { nameAr: "مكة المكرمة", nameEn: "Mecca", lat: 21.3891, lon: 39.8579 },
      { nameAr: "المدينة المنورة", nameEn: "Medina", lat: 24.5247, lon: 39.5692 },
      { nameAr: "الدمام", nameEn: "Dammam", lat: 26.4207, lon: 50.0888 },
      { nameAr: "الطائف", nameEn: "Taif", lat: 21.2854, lon: 40.4144 },
      { nameAr: "تبوك", nameEn: "Tabuk", lat: 28.3998, lon: 36.5717 },
    ],
  },
  {
    code: "AE",
    nameAr: "الإمارات العربية المتحدة",
    nameEn: "UAE",
    cities: [
      { nameAr: "دبي", nameEn: "Dubai", lat: 25.2048, lon: 55.2708 },
      { nameAr: "أبوظبي", nameEn: "Abu Dhabi", lat: 24.4539, lon: 54.3773 },
      { nameAr: "الشارقة", nameEn: "Sharjah", lat: 25.3573, lon: 55.4033 },
      { nameAr: "العين", nameEn: "Al Ain", lat: 24.2075, lon: 55.7447 },
      { nameAr: "رأس الخيمة", nameEn: "Ras Al Khaimah", lat: 25.7895, lon: 55.9432 },
    ],
  },
  {
    code: "KW",
    nameAr: "الكويت",
    nameEn: "Kuwait",
    cities: [
      { nameAr: "مدينة الكويت", nameEn: "Kuwait City", lat: 29.3697, lon: 47.9783 },
      { nameAr: "الجهراء", nameEn: "Jahra", lat: 29.3378, lon: 47.6581 },
      { nameAr: "السالمية", nameEn: "Salmiya", lat: 29.3399, lon: 48.0763 },
      { nameAr: "الأحمدي", nameEn: "Ahmadi", lat: 29.0769, lon: 48.0838 },
    ],
  },
  {
    code: "JO",
    nameAr: "الأردن",
    nameEn: "Jordan",
    cities: [
      { nameAr: "عمّان", nameEn: "Amman", lat: 31.9539, lon: 35.9106 },
      { nameAr: "الزرقاء", nameEn: "Zarqa", lat: 32.0728, lon: 36.0878 },
      { nameAr: "إربد", nameEn: "Irbid", lat: 32.5556, lon: 35.85 },
      { nameAr: "العقبة", nameEn: "Aqaba", lat: 29.5321, lon: 35.0063 },
    ],
  },
  {
    code: "MA",
    nameAr: "المغرب",
    nameEn: "Morocco",
    cities: [
      { nameAr: "الرباط", nameEn: "Rabat", lat: 34.0132, lon: -6.8326 },
      { nameAr: "الدار البيضاء", nameEn: "Casablanca", lat: 33.5731, lon: -7.5898 },
      { nameAr: "مراكش", nameEn: "Marrakech", lat: 31.6295, lon: -7.9811 },
      { nameAr: "فاس", nameEn: "Fes", lat: 34.0181, lon: -5.0078 },
      { nameAr: "طنجة", nameEn: "Tangier", lat: 35.7595, lon: -5.834 },
    ],
  },
  {
    code: "TN",
    nameAr: "تونس",
    nameEn: "Tunisia",
    cities: [
      { nameAr: "تونس", nameEn: "Tunis", lat: 36.8065, lon: 10.1815 },
      { nameAr: "صفاقس", nameEn: "Sfax", lat: 34.7398, lon: 10.7601 },
      { nameAr: "سوسة", nameEn: "Sousse", lat: 35.8245, lon: 10.638 },
      { nameAr: "القيروان", nameEn: "Kairouan", lat: 35.6712, lon: 10.1005 },
    ],
  },
  {
    code: "LB",
    nameAr: "لبنان",
    nameEn: "Lebanon",
    cities: [
      { nameAr: "بيروت", nameEn: "Beirut", lat: 33.8938, lon: 35.5018 },
      { nameAr: "طرابلس", nameEn: "Tripoli", lat: 34.4367, lon: 35.8497 },
      { nameAr: "صيدا", nameEn: "Sidon", lat: 33.5571, lon: 35.3729 },
      { nameAr: "صور", nameEn: "Tyre", lat: 33.2705, lon: 35.2038 },
    ],
  },
  {
    code: "QA",
    nameAr: "قطر",
    nameEn: "Qatar",
    cities: [
      { nameAr: "الدوحة", nameEn: "Doha", lat: 25.2854, lon: 51.5310 },
      { nameAr: "الريان", nameEn: "Al Rayyan", lat: 25.2921, lon: 51.4428 },
      { nameAr: "الوكرة", nameEn: "Al Wakrah", lat: 25.1768, lon: 51.6042 },
    ],
  },
  {
    code: "BH",
    nameAr: "البحرين",
    nameEn: "Bahrain",
    cities: [
      { nameAr: "المنامة", nameEn: "Manama", lat: 26.2285, lon: 50.5860 },
      { nameAr: "المحرق", nameEn: "Muharraq", lat: 26.2558, lon: 50.6120 },
    ],
  },
  {
    code: "OM",
    nameAr: "سلطنة عمان",
    nameEn: "Oman",
    cities: [
      { nameAr: "مسقط", nameEn: "Muscat", lat: 23.5859, lon: 58.4059 },
      { nameAr: "صلالة", nameEn: "Salalah", lat: 17.0151, lon: 54.0924 },
      { nameAr: "صحار", nameEn: "Sohar", lat: 24.3461, lon: 56.7414 },
    ],
  },
  {
    code: "DZ",
    nameAr: "الجزائر",
    nameEn: "Algeria",
    cities: [
      { nameAr: "الجزائر", nameEn: "Algiers", lat: 36.7538, lon: 3.0588 },
      { nameAr: "وهران", nameEn: "Oran", lat: 35.6971, lon: -0.6308 },
      { nameAr: "قسنطينة", nameEn: "Constantine", lat: 36.3650, lon: 6.6147 },
    ],
  },
  {
    code: "PS",
    nameAr: "فلسطين",
    nameEn: "Palestine",
    cities: [
      { nameAr: "القدس", nameEn: "Jerusalem", lat: 31.7683, lon: 35.2137 },
      { nameAr: "غزة", nameEn: "Gaza", lat: 31.5017, lon: 34.4667 },
      { nameAr: "رام الله", nameEn: "Ramallah", lat: 31.9029, lon: 35.2043 },
    ],
  },
  {
    code: "IQ",
    nameAr: "العراق",
    nameEn: "Iraq",
    cities: [
      { nameAr: "بغداد", nameEn: "Baghdad", lat: 33.3152, lon: 44.3661 },
      { nameAr: "البصرة", nameEn: "Basra", lat: 30.5081, lon: 47.7835 },
      { nameAr: "أربيل", nameEn: "Erbil", lat: 36.1911, lon: 44.0094 },
    ],
  },
  {
    code: "LY",
    nameAr: "ليبيا",
    nameEn: "Libya",
    cities: [
      { nameAr: "طرابلس", nameEn: "Tripoli", lat: 32.8872, lon: 13.1913 },
      { nameAr: "بنغازي", nameEn: "Benghazi", lat: 32.1167, lon: 20.0667 },
    ],
  },
  {
    code: "US",
    nameAr: "الولايات المتحدة",
    nameEn: "USA",
    cities: [
      { nameAr: "نيويورك", nameEn: "New York", lat: 40.7128, lon: -74.0060 },
      { nameAr: "لوس أنجلوس", nameEn: "Los Angeles", lat: 34.0522, lon: -118.2437 },
      { nameAr: "شيكاغو", nameEn: "Chicago", lat: 41.8781, lon: -87.6298 },
    ],
  },
  {
    code: "GB",
    nameAr: "المملكة المتحدة",
    nameEn: "United Kingdom",
    cities: [
      { nameAr: "لندن", nameEn: "London", lat: 51.5074, lon: -0.1278 },
      { nameAr: "مانشستر", nameEn: "Manchester", lat: 53.4808, lon: -2.2426 },
    ],
  },
  {
    code: "FR",
    nameAr: "فرنسا",
    nameEn: "France",
    cities: [
      { nameAr: "باريس", nameEn: "Paris", lat: 48.8566, lon: 2.3522 },
      { nameAr: "ليون", nameEn: "Lyon", lat: 45.7640, lon: 4.8357 },
    ],
  },
  {
    code: "DE",
    nameAr: "ألمانيا",
    nameEn: "Germany",
    cities: [
      { nameAr: "برلين", nameEn: "Berlin", lat: 52.5200, lon: 13.4050 },
      { nameAr: "ميونخ", nameEn: "Munich", lat: 48.1351, lon: 11.5820 },
    ],
  },
  {
    code: "TR",
    nameAr: "تركيا",
    nameEn: "Turkey",
    cities: [
      { nameAr: "إسطنبول", nameEn: "Istanbul", lat: 41.0082, lon: 28.9784 },
      { nameAr: "أنقرة", nameEn: "Ankara", lat: 39.9334, lon: 32.8597 },
    ],
  },
  {
    code: "RU",
    nameAr: "روسيا",
    nameEn: "Russia",
    cities: [
      { nameAr: "موسكو", nameEn: "Moscow", lat: 55.7558, lon: 37.6173 },
      { nameAr: "سان بطرسبرج", nameEn: "Saint Petersburg", lat: 59.9311, lon: 30.3609 },
      { nameAr: "نوفوسيبيرسك", nameEn: "Novosibirsk", lat: 55.0084, lon: 82.9357 },
    ],
  },
];

const API_KEY = "f6abe6ad406546288ae28486dc3f2ed1";

let cancelAxios = null;

function App() {
  const { t, i18n } = useTranslation();

  const [locale, setLocale] = useState("ar");
  const direction = locale === "ar" ? "rtl" : "ltr";

  const [selectedCountry, setSelectedCountry] = useState(countriesData[0]);
  const [selectedCity, setSelectedCity] = useState(countriesData[0].cities[0]);

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dateandtime, setDateTime] = useState("");

  // --- تغيير اللغة ---
  function handleLangToggle() {
    const newLang = locale === "ar" ? "en" : "ar";
    setLocale(newLang);
    i18n.changeLanguage(newLang);
    moment.locale(newLang);
  }

  // --- تغيير الدولة ---
  function handleCountryChange(e) {
    const country = countriesData.find((c) => c.code === e.target.value);
    setSelectedCountry(country);
    setSelectedCity(country.cities[0]);
  }

  // --- تغيير المدينة ---
  function handleCityChange(e) {
    const city = selectedCountry.cities.find((c) => c.nameEn === e.target.value);
    setSelectedCity(city);
  }

  // --- ساعة الوقت ---
  useEffect(() => {
    i18n.changeLanguage("ar");
    moment.locale("ar");
    setDateTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    const timer = setInterval(() => {
      setDateTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- جلب بيانات الطقس ---
  useEffect(() => {
    if (!selectedCity) return;

    if (cancelAxios) {
      try { cancelAxios(); } catch (_) {}
    }

    setLoading(true);
    setError(null);

    const { lat, lon } = selectedCity;

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const forecastUrl       = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    Promise.all([
      axios.get(currentWeatherUrl),
      axios.get(forecastUrl),
    ])
      .then(([currentRes, forecastRes]) => {
        // --- بيانات الطقس الحالي ---
        const currentTemp = Math.round(currentRes.data.main.temp - 272.15);
        const description = currentRes.data.weather[0].description;
        const icon        = currentRes.data.weather[0].icon;
        const humidity    = currentRes.data.main.humidity;
        const windSpeed   = Math.round(currentRes.data.wind.speed * 3.6);
        const feelsLike   = Math.round(currentRes.data.main.feels_like - 272.15);

        // --- حساب الـ min/max الحقيقية من توقعات اليوم ---
        const todayDate = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
        const todayEntries = forecastRes.data.list.filter((entry) =>
          entry.dt_txt.startsWith(todayDate)
        );

        let tempMin, tempMax;
        if (todayEntries.length > 0) {
          const temps = todayEntries.map((e) => Math.round(e.main.temp - 272.15));
          tempMin = Math.min(...temps);
          tempMax = Math.max(...temps);
        } else {
          // لو مفيش بيانات لليوم (نادراً) استخدم كل بيانات الـ 24 ساعة الجاية
          const next8 = forecastRes.data.list.slice(0, 8);
          const temps = next8.map((e) => Math.round(e.main.temp - 272.15));
          tempMin = Math.min(...temps);
          tempMax = Math.max(...temps);
        }

        setWeatherData({
          tempNumber: currentTemp,
          minTemp: tempMin,
          maxTemp: tempMax,
          description,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          humidity,
          windSpeed,
          feelsLike,
        });
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError("تعذّر جلب بيانات الطقس. حاول مرة أخرى.");
          setLoading(false);
        }
      });
  }, [selectedCity]);

  const cityDisplayName = locale === "ar" ? selectedCity?.nameAr : selectedCity?.nameEn;
  const countryDisplayName = locale === "ar" ? selectedCountry?.nameAr : selectedCountry?.nameEn;

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "20px 0",
            }}
          >
            {/* ===== Selectors Row ===== */}
            <div
              className="selectors-row"
              dir={direction}
              style={{
                display: "flex",
                gap: "12px",
                width: "100%",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              {/* Country Selector */}
              <FormControl
                variant="outlined"
                style={{ flex: 1, minWidth: "140px" }}
              >
                <label
                  style={{
                    color: "#64748b",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    display: "block",
                    fontFamily: "IBM",
                  }}
                >
                  {locale === "ar" ? "🌍 اختر الدولة" : "🌍 Select Country"}
                </label>
                <Select
                  value={selectedCountry.code}
                  onChange={handleCountryChange}
                  className="solid-select"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        background: "#1e293b",
                        color: "white",
                        borderRadius: "12px",
                        border: "1px solid #334155",
                      },
                    },
                  }}
                >
                  {countriesData.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {locale === "ar" ? country.nameAr : country.nameEn}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* City Selector */}
              <FormControl
                variant="outlined"
                style={{ flex: 1, minWidth: "140px" }}
              >
                <label
                  style={{
                    color: "#64748b",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    display: "block",
                    fontFamily: "IBM",
                  }}
                >
                  {locale === "ar" ? "🏙️ اختر المدينة" : "🏙️ Select City"}
                </label>
                <Select
                  value={selectedCity?.nameEn || ""}
                  onChange={handleCityChange}
                  className="solid-select"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        background: "#1e293b",
                        color: "white",
                        borderRadius: "12px",
                        border: "1px solid #334155",
                      },
                    },
                  }}
                >
                  {selectedCountry.cities.map((city) => (
                    <MenuItem key={city.nameEn} value={city.nameEn}>
                      {locale === "ar" ? city.nameAr : city.nameEn}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* ===== Weather Card ===== */}
            <div className="weather-card">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                  }}
                >
                  <CircularProgress style={{ color: "#3b82f6" }} size={60} />
                </div>
              ) : error ? (
                <Typography
                  variant="h6"
                  style={{ color: "#ff6b6b", textAlign: "center", padding: "40px 0" }}
                >
                  {error}
                </Typography>
              ) : weatherData ? (
                <div dir={direction}>
                  {/* City Name + Date */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div>
                      <Typography
                        variant="h3"
                        style={{ fontWeight: "700", lineHeight: 1.1, color: "#f1f5f9" }}
                      >
                        {cityDisplayName}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ color: "#64748b", marginTop: "4px", fontWeight: "600", fontSize: "13px" }}
                      >
                        {countryDisplayName}
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      style={{
                        color: "#475569",
                        fontSize: "12px",
                        textAlign: direction === "rtl" ? "left" : "right",
                      }}
                    >
                      {dateandtime}
                    </Typography>
                  </div>

                  <div className="card-divider" />

                  {/* Temp + Icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Typography
                        variant="h1"
                        style={{ fontWeight: "800", fontSize: "6rem", color: "#f1f5f9" }}
                      >
                        {weatherData.tempNumber}°
                      </Typography>
                      <img
                        src={weatherData.icon}
                        alt="weather icon"
                        style={{ width: "90px", height: "90px", filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))" }}
                      />
                    </div>

                    {/* Description + Min/Max */}
                    <div style={{ textAlign: direction === "rtl" ? "left" : "right" }}>
                      <Typography
                        variant="h6"
                        style={{
                          textTransform: "capitalize",
                          color: "#cbd5e1",
                          fontWeight: "600",
                          marginBottom: "6px",
                        }}
                      >
                        {t(weatherData.description) || weatherData.description}
                      </Typography>
                      <div style={{ display: "flex", gap: "16px", justifyContent: direction === "rtl" ? "flex-end" : "flex-start" }}>
                        <span className="temp-badge min">
                          ↓ {weatherData.minTemp}°
                        </span>
                        <span className="temp-badge max">
                          ↑ {weatherData.maxTemp}°
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Extra Info Row */}
                  <div className="extra-info-row">
                    <div className="info-chip">
                      <span className="info-icon">💧</span>
                      <div>
                        <div className="info-label">
                          {locale === "ar" ? "الرطوبة" : "Humidity"}
                        </div>
                        <div className="info-value">{weatherData.humidity}%</div>
                      </div>
                    </div>
                    <div className="info-chip">
                      <span className="info-icon">💨</span>
                      <div>
                        <div className="info-label">
                          {locale === "ar" ? "الرياح" : "Wind"}
                        </div>
                        <div className="info-value">
                          {weatherData.windSpeed} {locale === "ar" ? "كم/س" : "km/h"}
                        </div>
                      </div>
                    </div>
                    <div className="info-chip">
                      <span className="info-icon">🌡️</span>
                      <div>
                        <div className="info-label">
                          {locale === "ar" ? "الإحساس" : "Feels Like"}
                        </div>
                        <div className="info-value">{weatherData.feelsLike}°</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {/* ===== End Weather Card ===== */}

            {/* Language Toggle */}
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                direction: direction,
                marginTop: "14px",
              }}
            >
              <Button
                className="lang-btn"
                variant="outlined"
                onClick={handleLangToggle}
              >
                {locale === "ar" ? "English" : "عربي"}
              </Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

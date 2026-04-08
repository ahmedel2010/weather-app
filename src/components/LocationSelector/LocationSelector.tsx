import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Continent, Country, City } from '../../types/weather.types';
import './LocationSelector.css';

interface LocationSelectorProps {
  continentsData: Continent[];
  selectedContinent: Continent;
  selectedCountry: Country;
  selectedCity: City;
  locale: string;
  direction: 'ltr' | 'rtl';
  onContinentChange: (e: SelectChangeEvent<string>) => void;
  onCountryChange: (e: SelectChangeEvent<string>) => void;
  onCityChange: (e: SelectChangeEvent<string>) => void;
}

const menuPaperStyle = {
  background: '#1e293b',
  color: 'white',
  borderRadius: '12px',
  border: '1px solid #334155',
};

function LocationSelector({
  continentsData,
  selectedContinent,
  selectedCountry,
  selectedCity,
  locale,
  direction,
  onContinentChange,
  onCountryChange,
  onCityChange,
}: LocationSelectorProps) {
  return (
    <div className="selectors-row" dir={direction}>

      {/* Continent Select */}
      <FormControl variant="outlined" style={{ flex: 1, minWidth: '130px' }}>
        <label className="selector-label">
          {locale === 'ar' ? '🌐 اختر القارة' : '🌐 Continent'}
        </label>
        <Select
          value={selectedContinent.code}
          onChange={onContinentChange}
          className="solid-select"
          MenuProps={{ PaperProps: { style: menuPaperStyle } }}
        >
          {continentsData.map((continent) => (
            <MenuItem key={continent.code} value={continent.code}>
              {locale === 'ar' ? continent.nameAr : continent.nameEn}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Country Select */}
      <FormControl variant="outlined" style={{ flex: 1, minWidth: '130px' }}>
        <label className="selector-label">
          {locale === 'ar' ? '🌍 اختر الدولة' : '🌍 Country'}
        </label>
        <Select
          value={selectedCountry.code}
          onChange={onCountryChange}
          className="solid-select"
          MenuProps={{ PaperProps: { style: menuPaperStyle } }}
        >
          {selectedContinent.countries.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              {locale === 'ar' ? country.nameAr : country.nameEn}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* City Select */}
      <FormControl variant="outlined" style={{ flex: 1, minWidth: '130px' }}>
        <label className="selector-label">
          {locale === 'ar' ? '🏙️ اختر المدينة' : '🏙️ City'}
        </label>
        <Select
          value={selectedCity?.nameEn || ''}
          onChange={onCityChange}
          className="solid-select"
          MenuProps={{ PaperProps: { style: menuPaperStyle } }}
        >
          {selectedCountry.cities.map((city) => (
            <MenuItem key={city.nameEn} value={city.nameEn}>
              {locale === 'ar' ? city.nameAr : city.nameEn}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
}

export default LocationSelector;

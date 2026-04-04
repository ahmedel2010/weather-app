# 🌤️ Weather App (Modern Dashboard)

A sophisticated weather application with a modern user interface, supporting all 27 Egyptian governorates and providing accurate real-time data using the latest React features and REST APIs.

---

## 📸 Preview

### 🌓 Modern Solid Design
![Homescreen](./public/Screenshot%202026-04-04%20235426.png)
---

## ✨ Features

- 🌍 **Full Egypt Support:** Includes all 27 Egyptian governorates with precise coordinates.
- 🏢 **Dynamic Selection:** Choose a Country (Egypt, Saudi Arabia, UAE, etc.) and then select its associated City.
- 🌡️ **Accurate Data:** Displays Current, Min, and Max temperatures (calculated precisely from daily forecasts).
- 💧 **Detailed Insights:** Humidity, Wind Speed, and "Feels Like" thermal information.
- 🌐 **Multi-language Support (i18n):** Seamless switching between Arabic and English with full RTL/LTR layout support.
- 🕒 **Live Clock:** Displays the current date and time, updating automatically every second.
- 📱 **Responsive Design:** A fluid interface that works efficiently across all screen sizes.

---

## 🛠️ Tech Stack

- **React.js (v19):** Core framework for component and state management.
- **Material UI (MUI):** For interactive components and selectors.
- **Vanilla CSS:** Custom styling for the Modern Solid UI and gradients.
- **Axios:** For daily REST API communication and data retrieval.
- **OpenWeatherMap API:** The primary source for weather data (Current & Forecast).
- **i18next:** For translation and multi-language support.
- **Moment.js:** For handling dates, times, and localization.

---

## 🚀 Getting Started

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

---

## 📡 API Usage

We use two separate endpoints to ensure the highest data accuracy:
*   `/weather` for instantaneous live data (humidity, wind, description).
*   `/forecast` to calculate the actual minimum and maximum temperatures expected within the next 24 hours.

---

## 🎨 Typography
The **IBM Plex Sans Arabic** font from Google Fonts was used for a professional and clear reading experience in both Arabic and English.

---

### Developed by:
**[Ahmed elsayed]** - 2026 🚀


import { useState, useEffect } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock weather data for demonstration
  const mockWeatherData = {
    "london": {
      city: "London",
      country: "UK",
      temp: 18,
      description: "partly cloudy",
      icon: "02d",
      feels_like: 20,
      humidity: 65,
      wind_speed: 3.5,
      rain: null
    },
    "paris": {
      city: "Paris",
      country: "FR",
      temp: 22,
      description: "clear sky",
      icon: "01d",
      feels_like: 24,
      humidity: 45,
      wind_speed: 2.1,
      rain: null
    },
    "tokyo": {
      city: "Tokyo",
      country: "JP",
      temp: 28,
      description: "light rain",
      icon: "10d",
      feels_like: 31,
      humidity: 78,
      wind_speed: 4.2,
      rain: 2.5
    }
  };

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);

    // Simulate API call with mock data
    setTimeout(() => {
      const weatherData = mockWeatherData[city.toLowerCase()] || {
        city: city,
        country: "Unknown",
        temp: Math.floor(Math.random() * 35),
        description: "clear sky",
        icon: "01d",
        feels_like: Math.floor(Math.random() * 35) + 2,
        humidity: Math.floor(Math.random() * 100),
        wind_speed: Math.floor(Math.random() * 10),
        rain: null
      };
      setWeather(weatherData);
      setLoading(false);
    }, 1000);
  };

  const getBgClass = () => {
    if (!weather) return "bg-default";
    const desc = weather.description.toLowerCase();
    if (desc.includes("rain")) return "bg-rainy";
    if (desc.includes("cloud")) return "bg-cloudy";
    if (desc.includes("clear")) return "bg-sunny";
    if (desc.includes("snow")) return "bg-snowy";
    return "bg-default";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`weather-container ${getBgClass()}`}>
      {/* Animated Background Elements */}
      <div className="floating-elements">
        <div className="floating-cloud cloud-1"></div>
        <div className="floating-cloud cloud-2"></div>
        <div className="floating-cloud cloud-3"></div>
        <div className="floating-sun"></div>
        <div className="floating-stars">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`star star-${i + 1}`}></div>
          ))}
        </div>
      </div>

      {/* Rain Effect */}
      {weather && weather.description.toLowerCase().includes("rain") && (
        <div className="rain-container">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="raindrop" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            }}></div>
          ))}
        </div>
      )}

      {/* Snow Effect */}
      {weather && weather.description.toLowerCase().includes("snow") && (
        <div className="snow-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${0.8 + Math.random() * 0.4}rem`
            }}>❄</div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <h1 className="main-title">
          <span className="title-icon">🌈</span>
          Weather Magic
          <span className="title-glow"></span>
        </h1>

        {/* Creative Search Bar */}
        <div className="search-container">
          <div className="search-wrapper">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Discover weather in any city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <button
              onClick={handleSearch}
              className="search-button"
              disabled={loading}
            >
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <span>Search</span>
                  <span className="button-glow"></span>
                </>
              )}
            </button>
          </div>
          <div className="search-suggestions">
            {!weather && (
              <div className="suggestions">
                <span onClick={() => setCity("London")}>London</span>
                <span onClick={() => setCity("Paris")}>Paris</span>
                <span onClick={() => setCity("Tokyo")}>Tokyo</span>
              </div>
            )}
          </div>
        </div>

        {/* Weather Card */}
        {weather && (
          <div className="weather-card">
            <div className="card-header">
              <h2 className="city-name">
                📍 {weather.city}, {weather.country}
              </h2>
              <div className="weather-icon-container">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                  alt={weather.description}
                  className="weather-icon"
                />
                <div className="icon-glow"></div>
              </div>
            </div>
            
            <p className="weather-description">{weather.description}</p>
            <div className="temperature">
              {weather.temp}°<span className="temp-unit">C</span>
            </div>

            <div className="weather-details">
              <div className="detail-card feels-like">
                <div className="detail-icon">🌡️</div>
                <div className="detail-value">{weather.feels_like}°C</div>
                <div className="detail-label">Feels Like</div>
              </div>
              <div className="detail-card humidity">
                <div className="detail-icon">💧</div>
                <div className="detail-value">{weather.humidity}%</div>
                <div className="detail-label">Humidity</div>
              </div>
              <div className="detail-card wind">
                <div className="detail-icon">💨</div>
                <div className="detail-value">{weather.wind_speed}m/s</div>
                <div className="detail-label">Wind</div>
              </div>
              <div className="detail-card rain">
                <div className="detail-icon">☔</div>
                <div className="detail-value">{weather.rain ? `${weather.rain}mm` : "—"}</div>
                <div className="detail-label">Rain</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .weather-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          transition: all 1s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .bg-default {
          background: linear-gradient(135deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #f093fb 50%, 
            #f5576c 75%, 
            #4facfe 100%);
        }

        .bg-sunny {
          background: linear-gradient(135deg, 
            #f6d365 0%, 
            #fda085 25%, 
            #f093fb 50%, 
            #f5576c 75%, 
            #feca57 100%);
        }

        .bg-rainy {
          background: linear-gradient(135deg, 
            #3a7bd5 0%, 
            #3a6073 25%, 
            #00d2ff 50%, 
            #3a7bd5 75%, 
            #2d3748 100%);
        }

        .bg-cloudy {
          background: linear-gradient(135deg, 
            #bdc3c7 0%, 
            #2c3e50 25%, 
            #4b6cb7 50%, 
            #182848 75%, 
            #4b79a1 100%);
        }

        .bg-snowy {
          background: linear-gradient(135deg, 
            #e6f2ff 0%, 
            #b8dcff 25%, 
            #74b9ff 50%, 
            #0984e3 75%, 
            #ffffff 100%);
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          opacity: 0.8;
        }

        .cloud-1 {
          width: 100px;
          height: 40px;
          top: 20%;
          animation: float-left 20s infinite linear;
        }

        .cloud-2 {
          width: 80px;
          height: 30px;
          top: 40%;
          animation: float-right 25s infinite linear;
        }

        .cloud-3 {
          width: 120px;
          height: 45px;
          top: 70%;
          animation: float-left 18s infinite linear;
        }

        .floating-sun {
          position: absolute;
          top: 10%;
          right: 10%;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, #feca57, #ff9ff3);
          border-radius: 50%;
          opacity: 0.8;
          animation: rotate 10s infinite linear;
          box-shadow: 0 0 30px rgba(254, 202, 87, 0.5);
        }

        .floating-stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .star {
          position: absolute;
          color: rgba(255, 255, 255, 0.8);
          animation: twinkle 2s infinite;
        }

        .star:nth-child(odd) {
          animation-delay: 1s;
        }

        .rain-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .raindrop {
          position: absolute;
          width: 2px;
          height: 20px;
          background: linear-gradient(transparent, rgba(255, 255, 255, 0.8));
          animation: rain-fall linear infinite;
        }

        .snow-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .snowflake {
          position: absolute;
          color: rgba(255, 255, 255, 0.9);
          animation: snow-fall linear infinite;
          user-select: none;
        }

        .main-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 600px;
          width: 90%;
        }

        .main-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 800;
          margin-bottom: 3rem;
          position: relative;
          background: linear-gradient(45deg, #fff, #f093fb, #fff, #feca57);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease-in-out infinite;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .title-icon {
          margin-right: 1rem;
          display: inline-block;
          animation: bounce 2s infinite;
        }

        .search-container {
          margin-bottom: 3rem;
          position: relative;
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 50px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .search-wrapper:hover,
        .search-wrapper:focus-within {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
        }

        .search-icon {
          padding: 0 20px;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          animation: pulse 2s infinite;
        }

        .search-input {
          flex: 1;
          padding: 18px 0;
          background: transparent;
          border: none;
          outline: none;
          font-size: 1.1rem;
          color: white;
          font-weight: 500;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .search-button {
          position: relative;
          padding: 18px 30px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .search-button:hover {
          background: linear-gradient(45deg, #764ba2, #667eea);
          transform: scale(1.05);
        }

        .search-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .search-suggestions {
          margin-top: 1rem;
        }

        .suggestions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .suggestions span {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
        }

        .suggestions span:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          color: white;
        }

        .weather-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(25px);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
          animation: slide-up 0.8s ease-out;
          position: relative;
          overflow: hidden;
        }

        .weather-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .city-name {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .weather-icon-container {
          position: relative;
        }

        .weather-icon {
          width: 80px;
          height: 80px;
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
        }

        .weather-description {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
          text-transform: capitalize;
          font-weight: 500;
        }

        .temperature {
          font-size: 4rem;
          font-weight: 800;
          color: white;
          margin-bottom: 2rem;
          text-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .temp-unit {
          font-size: 2rem;
          opacity: 0.8;
        }

        .weather-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }

        .detail-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 1.5rem 1rem;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .detail-card:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .detail-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .detail-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.3rem;
        }

        .detail-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float-left {
          from { transform: translateX(-100px); }
          to { transform: translateX(calc(100vw + 100px)); }
        }

        @keyframes float-right {
          from { transform: translateX(calc(100vw + 100px)); }
          to { transform: translateX(-100px); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rain-fall {
          to { transform: translateY(100vh); }
        }

        @keyframes snow-fall {
          to { 
            transform: translateY(100vh) rotate(360deg); 
          }
        }

        @media (max-width: 768px) {
          .main-content {
            width: 95%;
            padding: 1rem;
          }
          
          .weather-card {
            padding: 2rem 1.5rem;
          }
          
          .card-header {
            flex-direction: column;
            text-align: center;
          }
          
          .city-name {
            font-size: 1.5rem;
          }
          
          .temperature {
            font-size: 3rem;
          }
          
          .weather-details {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
import React, { useState } from "react";
import axios from "axios";

const WeatherDisplay = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "cbf34c722696d56dcebabf62ed80830b";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    setWeatherData(null); // Reset previous weather data
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
    } catch (err) {
      setWeatherData(null);
      setError(
        "Error fetching weather data. Please check the city name and your internet connection."
      );
      console.error("Error fetching weather:", err);
    }
  };

  return (
    <div>
      <h2>Welcome to Weather App!</h2>
      <div>
        <input
          type="text"
          placeholder=" "
          
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Find Weather</button>
      </div>
      <h3>(e.g., London)</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div>
          <h3>Weather in {weatherData.name}, {weatherData.sys.country}</h3>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Feels like: {weatherData.main.feels_like}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
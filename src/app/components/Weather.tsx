"use client"; // Weather.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import { WeatherData } from "../types";
import {
  FaSpinner,
  FaTemperatureHigh,
  FaWind,
  FaCloudSun,
} from "react-icons/fa";
import NavigationBar from "./NavigationBar";
import CalendarWidget from "./CalendarWidget";
import WeatherWidget from "./WeatherWidget";
import WeeklyForecast from "./WeeklyForecast";
import HourlyForecast from "./HourlyForecast";
import WeatherAlerts from "./WeatherAlerts";

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<WeatherData[]>([]);

  useEffect(() => {
    // Fetch weather data for a default city on initial load
    fetchWeather("London");
  }, []);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const response = await axios.get<WeatherData>(
        `https://api.weatherapi.com/v1/forecast.json?key=0fedb1829ae7403ea5d64409243005&q=${city}&days=7&alerts=yes`
      );
      setWeather(response.data);
      updateRecentSearches(response.data);
      setError("");
    } catch (err) {
      setError("City not found or API error");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Determine background color based on weather condition
  const determineBackgroundColor = () => {
    if (!weather) return "bg-gradient-to-r from-blue-400 to-purple-600";

    const condition = weather.current.condition.text.toLowerCase();
    if (condition.includes("rain")) {
      return "bg-gradient-to-r from-blue-400 to-gray-600";
    } else if (condition.includes("cloud")) {
      return "bg-gradient-to-r from-gray-400 to-gray-600";
    } else if (condition.includes("clear")) {
      return "bg-gradient-to-r from-blue-200 to-blue-400";
    } else {
      return "bg-gradient-to-r from-blue-400 to-purple-600";
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const updateRecentSearches = (weatherData: WeatherData) => {
    // Check if the city is already in the recent searches
    const existingIndex = recentSearches.findIndex(
      (search) => search.location.name === weatherData.location.name
    );

    if (existingIndex !== -1) {
      // If the city exists, remove it from the array
      const updatedSearches = [...recentSearches];
      updatedSearches.splice(existingIndex, 1);
      updatedSearches.unshift(weatherData);

      setRecentSearches(updatedSearches.slice(0, 3));
    } else {
      // If the city doesn't exist, add it to the beginning of the array
      setRecentSearches([weatherData, ...recentSearches].slice(0, 3));
    }
  };
  return (
    <div
      className={`flex flex-col min-h-screen ${determineBackgroundColor()} text-white`}
    >
      {/* Navigation Bar */}
      <NavigationBar onSubmit={fetchWeather} loading={loading} error={error} />

      {/* City Input and Weather Fetch */}
      <div className="container mx-auto py-8">
        <form onSubmit={handleSubmit}>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8 mb-8 flex items-center justify-between">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="p-2 rounded-md border border-gray-300 text-black w-full mr-4"
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <FaSpinner className="animate-spin text-white" />
              ) : (
                "Get Weather"
              )}
            </button>
          </div>
        </form>

        {recentSearches.length > 0 && (
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 m-4">
            <h2 className="text-2xl font-bold mb-4">Recent Searches</h2>
            <ul>
              {recentSearches.map((search, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => setWeather(search)}
                >
                  <div>
                    <p className="font-bold">{search.location.name}</p>
                    <p>{search.current.temp_c}°C</p>
                  </div>
                  <img
                    src={`https:${search.current.condition.icon}`}
                    alt={search.current.condition.text}
                    className="w-8 h-8"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8 mb-8">
          {loading ? (
            <div className="flex items-center justify-center">
              <FaSpinner className="animate-spin text-2xl mr-2" />
              <span>Loading...</span>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : weather ? (
            <>
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold">{weather.location.name}</h2>
                <p className="text-lg">{weather.current.last_updated}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <WeatherWidget
                  title="Temperature"
                  value={`${weather.current.temp_c}°C`}
                  icon={<FaTemperatureHigh className="text-2xl" />}
                />
                <WeatherWidget
                  title="Wind"
                  value={`${weather.current.wind_kph} kph`}
                  icon={<FaWind className="text-2xl" />}
                />
                <WeatherWidget
                  title="Condition"
                  value={weather.current.condition.text}
                  icon={<FaCloudSun className="text-2xl" />}
                />
                <WeatherWidget
                  title="Humidity"
                  value={`${weather.current.humidity}%`}
                  icon={<FaCloudSun className="text-2xl" />}
                />
                <WeatherWidget
                  title="UV Index"
                  value={`${weather.current.uv}`}
                  icon={<FaCloudSun className="text-2xl" />}
                />
              </div>
            </>
          ) : (
            <p className="text-center">
              Enter a city to get weather information.
            </p>
          )}
        </div>

        {weather && weather.forecast && weather.forecast.forecastday ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div id="weekly-forecast" className="col-span-1">
              <CalendarWidget forecast={weather.forecast.forecastday} />
            </div>
            <div id="hourly-forecast" className="col-span-1 md:col-span-2">
              <WeeklyForecast forecast={weather.forecast.forecastday} />
            </div>

            <div id="weather-alerts" className="col-span-1 md:col-span-3">
              <HourlyForecast
                hourlyData={weather.forecast.forecastday[0].hour}
              />
            </div>
            <div className="col-span-1 md:col-span-3">
              <WeatherAlerts alerts={weather.alerts.alert} />
            </div>
          </div>
        ) : (
          weather && (
            <p className="text-red-500 text-center">
              No forecast data available
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Weather;

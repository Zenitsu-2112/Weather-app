// src/app/components/WeeklyForecast.tsx
"use client";

import React from "react";
import { ForecastDay } from "../types";

const WeeklyForecast = ({ forecast }: { forecast: ForecastDay[] }) => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 m-4 w-full">
      <h2 className="text-2xl font-bold mb-4">7-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {forecast.map((day, index) => (
          <div key={index} className="text-center">
            <p className="font-bold">{day.date}</p>
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="mx-auto"
            />
            <p>
              {day.day.avgtemp_c}°C / {day.day.avgtemp_f}°F
            </p>
            <p>{day.day.condition.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;

// src/app/components/HourlyForecast.tsx
"use client";

import React from "react";
import { HourlyWeather } from "../types";
import moment from "moment";

const HourlyForecast = ({ hourlyData }: { hourlyData: HourlyWeather[] }) => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 m-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Hourly Forecast</h2>
      <div className="overflow-x-scroll">
        <div className="flex space-x-4">
          {hourlyData.map((hour, index) => (
            <div key={index} className="text-center">
              <p className="font-bold">{moment(hour.time).format("HH:mm")}</p>
              <img
                src={`https:${hour.condition.icon}`}
                alt={hour.condition.text}
                className="mx-auto"
              />
              <p>{hour.temp_c}°C</p>
              <p>{hour.condition.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;

// src/app/components/WeatherWidget.tsx
"use client";

import React from "react";
import { FaCloudSun, FaWind } from "react-icons/fa";

const WeatherWidget = ({ title, value, icon }: any) => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 m-4 flex flex-col items-center">
      <div className="flex items-center justify-center text-4xl mb-2">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-center">{title}</h2>
      <p className="text-center text-2xl mt-2">{value}</p>
    </div>
  );
};

export default WeatherWidget;

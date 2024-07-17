// src/app/components/WeatherAlerts.tsx
"use client";

import React from "react";
import { WeatherAlert } from "../types";

const WeatherAlerts = ({ alerts }: { alerts: WeatherAlert[] }) => {
  return (
    <div className="bg-red-600 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg p-6 m-4 w-full text-white">
      <h2 className="text-2xl font-bold mb-4">Weather Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts at this time.</p>
      ) : (
        alerts.map((alert, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold">{alert.headline}</p>
            <p>{alert.desc}</p>
            <p className="text-sm">{alert.instruction}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default WeatherAlerts;

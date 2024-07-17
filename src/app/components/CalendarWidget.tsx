// src/app/components/CalendarWidget.tsx

import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";
import { ForecastDay } from "../types";

interface CalendarWidgetProps {
  forecast: ForecastDay[]; // Forecast data from Weather component
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ forecast }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const renderForecastForDate = () => {
    if (!selectedDate) return null;

    // Find the forecast data for the selected date
    const selectedDateString = selectedDate.toISOString().split("T")[0];
    const selectedDayForecast = forecast.find(
      (day) => day.date === selectedDateString
    );

    if (!selectedDayForecast)
      return <p>No forecast available for this date.</p>;

    // Display the forecast details for the selected date
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">
          Forecast for {selectedDateString}
        </h3>
        <p>Max Temp: {selectedDayForecast.day.maxtemp_c}°C</p>
        <p>Min Temp: {selectedDayForecast.day.mintemp_c}°C</p>
        <p>Condition: {selectedDayForecast.day.condition.text}</p>
        {/* Add more weather details as needed */}
      </div>
    );
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    const dateString = date.toISOString().split("T")[0];
    const hasForecast = forecast.some((day) => day.date === dateString);

    return hasForecast ? <div style={{ opacity: 0.5 }}>🌦️</div> : null;
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-10 mt-6 w-full max-w-md mx-auto text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">Calendar</h2>
        <FaCalendarAlt className="text-2xl" />
      </div>
      <Calendar
        onChange={onChange}
        value={selectedDate}
        className="rounded-lg shadow-md bg-opacity-20 backdrop-blur-lg text-black"
        tileContent={tileContent} // Apply custom content to calendar tiles
      />
      <div className="mt-4">{renderForecastForDate()}</div>
    </div>
  );
};

export default CalendarWidget;

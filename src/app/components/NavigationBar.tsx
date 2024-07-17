// NavigationBar.tsx

import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

interface NavigationBarProps {
  onSubmit: (city: string) => void;
  loading: boolean;
  error: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  onSubmit,
  loading,
  error,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-white bg-opacity-20 backdrop-blur-lg p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Weather App</h1>
      <div className="block lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <FaBars className="text-2xl" />
        </button>
      </div>
      <div className={`lg:flex ${showMenu ? "block" : "hidden"} mt-4 lg:mt-0`}>
        <a
          href="#"
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
        >
          Home
        </a>
        <a
          href="#weekly-forecast"
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
        >
          Weekly Forecast
        </a>
        <a
          href="#hourly-forecast"
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"
        >
          Hourly Forecast
        </a>
        <a
          href="#weather-alerts"
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400"
        >
          Weather Alerts
        </a>
      </div>
    </nav>
  );
};

export default NavigationBar;

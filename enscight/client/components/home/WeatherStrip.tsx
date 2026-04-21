"use client";

import { useEffect, useMemo, useState } from "react";

type WeatherState = {
  temperature: string;
  condition: string;
  city: string;
};

const weatherCodeMap: Record<number, string> = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Misty",
  48: "Rime Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Dense Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  80: "Rain Showers",
  81: "Showers",
  82: "Intense Showers",
  95: "Thunderstorm",
};

const getTimezoneCity = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const fallback = "Unknown";
  if (!timezone.includes("/")) return fallback;
  const parts = timezone.split("/");
  return parts[parts.length - 1].replaceAll("_", " ");
};

export function WeatherStrip() {
  const guessedCity = useMemo(getTimezoneCity, []);
  const [weather, setWeather] = useState<WeatherState>({
    temperature: "--°",
    condition: "Calm",
    city: guessedCity,
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
          );

          if (!weatherResponse.ok) return;

          const weatherData = await weatherResponse.json();
          const temperature = Math.round(weatherData.current.temperature_2m);
          const weatherCode = weatherData.current.weather_code as number;
          const condition = weatherCodeMap[weatherCode] ?? "Balanced";

          setWeather((prev) => ({
            ...prev,
            temperature: `${temperature}°`,
            condition,
          }));
        } catch {
          // Stay subtle with fallback data.
        }
      },
      () => {
        // Keep guessed city and default climate profile on denial.
      },
      { enableHighAccuracy: false, timeout: 9000 },
    );
  }, []);

  return (
    <aside className="absolute right-5 top-6 z-20 text-right text-xs text-ens-platinum/75 sm:right-10 sm:top-8">
      <p className="font-technical uppercase tracking-[0.24em] text-ens-platinum/45">Atmosphere</p>
      <p className="mt-1 font-light tracking-[0.12em]">
        {weather.temperature} {weather.condition}
      </p>
      <p className="mt-0.5 text-[0.67rem] uppercase tracking-[0.22em] text-ens-platinum/55">
        {weather.city}
      </p>
    </aside>
  );
}

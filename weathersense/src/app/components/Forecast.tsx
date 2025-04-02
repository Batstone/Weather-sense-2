import { WeatherData } from "@/types/weather";

import Image from "next/image";

import styles from "@/app/styles/Forecast.module.css";

interface ForecastProps {
  weatherData: WeatherData;
  tempUnit: string;
}

export default function Forecast({ weatherData, tempUnit }: ForecastProps) {
  return (
    <>
      <h3 className={styles.forecast_header}>Weekly Forecast</h3>
      <ul className={styles.forecast}>
        {weatherData.forecast.forecastday.map((day) => {
          const dateStr = day.date;
          const date = new Date(dateStr);

          const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const dayOfWeek = daysOfWeek[date.getDay()];

          return (
            <li key={day.date} className={styles.forecast__day}>
              <div>
                <h3 className={styles.forecast__week_day}>{dayOfWeek}</h3>
                <h4>{day.date}</h4>
                <p className={styles.forecast__description}>{day.day.condition.text}</p>
              </div>
              <div className={styles.forecast__img_container}>
                <Image src={day.day.condition.icon} alt={day.day.condition.text} width={50} height={50} priority unoptimized />
              </div>
              <ul className={styles.forecast__temps_weekly}>
                <li>
                  Max: {day.day.maxtemp_c}
                  {tempUnit}
                </li>
                <li>
                  Min: {day.day.mintemp_c}
                  {tempUnit}
                </li>
              </ul>
              <div>
                <p>Feels like</p>
                <p>
                  <svg fill="#2E2EFF" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>water-drop</title>
                    <path d="M25.378 19.75c1.507 6.027-3.162 11.25-9.375 11.25s-10.9-5.149-9.375-11.25c0.937-3.75 5.625-9.375 9.375-18.75 3.75 9.374 8.438 15 9.375 18.75z" />
                  </svg>
                  {day.day.totalprecip_mm}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

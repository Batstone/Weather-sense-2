import { WeatherData } from "@/types/weather";

import Image from "next/image";

import styles from "@/app/styles/Forecast.module.css";

export default function Forecast({ weatherData }: { weatherData: WeatherData }) {
  return (
    <>
      <h2>Weekly Forecast</h2>
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
              <ul className={styles.forecast__temps}>
                <li>Max: {day.day.maxtemp_c}°C</li>
                <li>Min: {day.day.mintemp_c}°C</li>
              </ul>
            </li>
          );
        })}
        ;
      </ul>
    </>
  );
}

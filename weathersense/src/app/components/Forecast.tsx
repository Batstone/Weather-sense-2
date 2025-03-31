import { WeatherData } from "@/types/weather";

import Image from "next/image";

import styles from "@/app/styles/Forecast.module.css";

export default function Forecast({ weatherData }: { weatherData: WeatherData }) {
  console.log("inside forecast", weatherData);
  return (
    <ul className={styles.forecast}>
      {weatherData.forecast.forecastday.map((day) => (
        <li key={day.date} className={styles.forecast__day}>
          <div>
            <h3>{day.date}</h3>
            <p>{day.day.condition.text}</p>
          </div>
          <div className={styles.forecast__img_container}>
            <Image src={day.day.condition.icon} alt={day.day.condition.text} width={50} height={50} priority unoptimized />
          </div>
          <ul>
            <p>Max: {day.day.maxtemp_c}°C</p>
            <p>Min: {day.day.mintemp_c}°C</p>
          </ul>
        </li>
      ))}
      ;
    </ul>
  );
}

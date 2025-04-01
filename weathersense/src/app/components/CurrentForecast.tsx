import { WeatherData } from "@/types/weather";

import Image from "next/image";

import styles from "@/app/styles/Forecast.module.css";

export default function CurrentForecast({ weatherData }: { weatherData: WeatherData }) {
  const weather = weatherData.current;
  return (
    <>
      <div>
        <h3 className={styles.forecast__week_day}>Current Weather</h3>
        <p className={styles.forecast__description}>{weather.condition.text}</p>
      </div>
      <div className={styles.forecast__img_container}>
        <Image src={weather.condition.icon} alt={weather.condition.text} width={50} height={50} priority unoptimized />
      </div>
      <div className={styles.forecast__temps}>
        <p>Max: {weather.temp_c}°C</p>
      </div>
    </>
  );
}

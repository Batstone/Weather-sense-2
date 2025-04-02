import { WeatherData } from "@/types/weather";

import Image from "next/image";

import styles from "@/app/styles/Forecast.module.css";

interface CurrentForecastProps {
  weatherData: WeatherData;
  tempUnit: string;
}

export default function CurrentForecast({ weatherData, tempUnit }: CurrentForecastProps) {
  const weather = weatherData.current;
  return (
    <div className={styles.current_forecast}>
      <div>
        <h3 className={styles.forecast_header}>Current Weather</h3>
        <p className={styles.forecast__description}>{weather.condition.text}</p>
      </div>
      <div className={styles.forecast__img_container}>
        <Image src={weather.condition.icon} alt={weather.condition.text} width={50} height={50} priority unoptimized />
      </div>
      <ul className={styles.forecast__temps}>
        <li>
          {weather.temp_c}
          {tempUnit}
        </li>
        <li className={styles.forecast__feels_like}>
          <p>Feels like</p>
          <p>
            {weather.feelslike_c}
            {tempUnit}
          </p>
        </li>
      </ul>
    </div>
  );
}

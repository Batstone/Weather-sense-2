import { WeatherData } from "@/app/types/weather";

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
        <h3>Current Weather</h3>
        <p className={styles.forecast__description}>{weather.condition.text}</p>
      </div>
      <div className={styles.forecast__img_container}>
        <Image src={weather.condition.icon} alt={weather.condition.text} width={50} height={50} priority unoptimized />
      </div>
      <ul className={styles.forecast__temps}>
        <li>
          {weather.temp_c}
          &deg;{tempUnit}
        </li>
        <li className={styles.forecast__feels_like}>
          <p>Feels like</p>
          <p>
            {weather.feelslike_c}
            &deg;{tempUnit}
          </p>
        </li>
      </ul>
      <div className={styles.forecast__wind}>
        <svg
          className={`${styles.forecast__icon} ${styles.forecast__icon_wind}`}
          aria-hidden="true"
          fill="#000000"
          height="800px"
          width="800px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 365.447 365.447"
        >
          <g>
            <g>
              <path d="M306.069,189.427H7.5c-4.143,0-7.5-3.358-7.5-7.5s3.357-7.5,7.5-7.5h297.119c0.469-0.092,0.954-0.14,1.45-0.14    c24.47,0,44.378-19.908,44.378-44.378S330.539,85.53,306.069,85.53s-44.378,19.908-44.378,44.378c0,4.142-3.357,7.5-7.5,7.5    s-7.5-3.358-7.5-7.5c0-32.741,26.637-59.378,59.378-59.378s59.378,26.637,59.378,59.378c0,32.224-25.801,58.535-57.829,59.358    C307.118,189.372,306.601,189.427,306.069,189.427z" />
            </g>
            <g>
              <path d="M152.283,137.479H7.5c-4.143,0-7.5-3.358-7.5-7.5s3.357-7.5,7.5-7.5h143.333c0.469-0.092,0.954-0.14,1.45-0.14    c24.47,0,44.378-19.908,44.378-44.378s-19.908-44.378-44.378-44.378c-24.471,0-44.379,19.908-44.379,44.378    c0,4.142-3.357,7.5-7.5,7.5s-7.5-3.358-7.5-7.5c0-32.741,26.638-59.378,59.379-59.378s59.378,26.637,59.378,59.378    c0,32.224-25.801,58.535-57.829,59.358C153.332,137.423,152.814,137.479,152.283,137.479z" />
            </g>
            <g>
              <path d="M244.186,346.866c-32.741,0-59.379-26.637-59.379-59.378c0-4.142,3.357-7.5,7.5-7.5s7.5,3.358,7.5,7.5    c0,24.47,19.908,44.378,44.379,44.378c24.47,0,44.378-19.908,44.378-44.378s-19.908-44.378-44.378-44.378H7.5    c-4.143,0-7.5-3.358-7.5-7.5s3.357-7.5,7.5-7.5h236.686c32.741,0,59.378,26.637,59.378,59.378S276.927,346.866,244.186,346.866z" />
            </g>
          </g>
        </svg>
        <p>
          {weather.wind_kph}km/h, {weather.wind_dir}
        </p>
      </div>
    </div>
  );
}

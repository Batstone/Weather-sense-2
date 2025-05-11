import { TempUnit, WeatherData, DayOfWeek } from "@/app/types/weather";
import { DAYS_OF_WEEK } from "../constants/contsants";

import Image from "next/image";

import styles from "@/app/styles/Forecast.module.css";

interface ForecastProps {
  weatherData: WeatherData;
  tempUnit: TempUnit;
}

export default function Forecast({ weatherData, tempUnit }: ForecastProps) {
  return (
    <>
      <h3 className={styles.forecast_header}>Weekly Forecast</h3>
      <ul className={styles.forecast}>
        {weatherData.forecast.forecastday.map((day) => {
          const dateStr = day.date;
          const date = new Date(dateStr);

          const dayOfWeek: DayOfWeek = DAYS_OF_WEEK[date.getDay()];

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
                  Max: {day.day[`maxtemp_${tempUnit}`]}
                  &deg;{tempUnit}
                </li>
                <li>
                  Min: {day.day[`mintemp_${tempUnit}`]}
                  &deg;{tempUnit}
                </li>
              </ul>

              <div>
                <div className={styles.forecast__precipitation}>
                  <svg
                    className={styles.forecast__icon}
                    aria-hidden="true"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 45.711 45.711"
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            fill="#ffffff"
                            d="M36.261,7.156c-0.435,0-0.86,0.031-1.28,0.09c-1.521-1.833-3.813-3-6.379-3c-0.492,0-0.976,0.043-1.442,0.125     C25.053,1.708,21.792,0,18.135,0C13.231,0,9.045,3.067,7.39,7.388c-4.091,0.935-7.144,4.597-7.144,8.971     c0,5.083,4.122,9.202,9.203,9.202c0.048,0,0.097,0,0.145,0c2.013,3.325,6.664,5.654,12.083,5.654     c5.576,0,10.343-2.469,12.252-5.951c0.744,0.194,1.526,0.3,2.334,0.3c5.082,0,9.201-4.122,9.201-9.204S41.343,7.156,36.261,7.156     z"
                          />
                          <path
                            fill="#2E2EFF"
                            d="M6.876,36.249c0,1.208,0.98,2.188,2.188,2.188c1.21,0,2.189-0.979,2.189-2.188c0-0.779-0.91-2.283-1.557-3.253     c-0.302-0.453-0.964-0.453-1.266,0C7.786,33.966,6.876,35.47,6.876,36.249z"
                          />
                          <path
                            fill="#2E2EFF"
                            d="M30.069,37.408c0,1.207,0.979,2.188,2.187,2.188c1.211,0,2.19-0.979,2.19-2.188c0-0.779-0.91-2.283-1.56-3.254     c-0.302-0.453-0.964-0.451-1.265,0C30.978,35.126,30.069,36.629,30.069,37.408z"
                          />
                          <path
                            fill="#2E2EFF"
                            d="M12.004,44.105c0,0.887,0.72,1.605,1.607,1.605c0.887,0,1.606-0.72,1.606-1.605c0-0.507-0.521-1.427-0.969-2.125     c-0.297-0.466-0.979-0.466-1.275,0C12.525,42.68,12.004,43.6,12.004,44.105z"
                          />
                          <path
                            fill="#2E2EFF"
                            d="M25.705,44.105c0,0.887,0.718,1.605,1.604,1.605c0.886,0,1.607-0.72,1.607-1.605c0-0.507-0.521-1.427-0.97-2.125     c-0.299-0.464-0.979-0.464-1.276,0C26.224,42.68,25.705,43.6,25.705,44.105z"
                          />
                          <path
                            fill="#2E2EFF"
                            d="M18.472,39.729c0,1.207,0.981,2.188,2.188,2.188c1.209,0,2.188-0.979,2.188-2.188c0-0.778-0.909-2.282-1.556-3.254     c-0.302-0.452-0.964-0.452-1.266,0C19.381,37.445,18.472,38.949,18.472,39.729z"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <p className={styles.forecast__rain_percent}>{day.day.daily_chance_of_rain}%</p>
                </div>
                <div className={styles.forecast__precipitation}>
                  <svg
                    className={styles.forecast__icon}
                    aria-hidden="true"
                    fill="#2E2EFF"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>water-drop</title>
                    <path d="M25.378 19.75c1.507 6.027-3.162 11.25-9.375 11.25s-10.9-5.149-9.375-11.25c0.937-3.75 5.625-9.375 9.375-18.75 3.75 9.374 8.438 15 9.375 18.75z" />
                  </svg>
                  <p>{Math.round(day.day.totalprecip_mm)}mm</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

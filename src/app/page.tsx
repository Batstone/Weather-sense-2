"use client";

import Header from "./components/Header";
import Form from "./components/Form";
import Footer from "./components/Footer";
import Forecast from "./components/Forecast";
import { TempUnit, WeatherData } from "@/app/types/weather";
import { CELCIUS, FAHRENHEIT, LOADING_MESSAGE } from "@/app/constants/contsants";
import { useState } from "react";

import styles from "@/app/styles/Form.module.css";
import CurrentForecast from "./components/CurrentForecast";
import Button from "./components/Button";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [tempUnit, setTempUnit] = useState<TempUnit>(CELCIUS);

  function handleTempMeasureChange() {
    if (tempUnit === CELCIUS) {
      setTempUnit(FAHRENHEIT);
    } else {
      setTempUnit(CELCIUS);
    }
  }

  function handleData(data: WeatherData) {
    setWeatherData(data);
    setLoading(false);
  }

  return (
    <>
      <Header />
      <main>
        <Form handleData={handleData} />

        <div className={styles.form__response}>
          {loading && <p>{LOADING_MESSAGE}</p>}
          {weatherData && (
            <>
              <h2>
                {weatherData.location.name} {weatherData.location.region}, {weatherData.location.country}
              </h2>
              <Button type="button" onClick={handleTempMeasureChange}>
                <p>&deg;{tempUnit.toUpperCase()}</p>
              </Button>
            </>
          )}
          {weatherData && !loading && <CurrentForecast weatherData={weatherData} tempUnit={tempUnit} />}
          {weatherData && !loading && <Forecast weatherData={weatherData} tempUnit={tempUnit} />}
        </div>
      </main>
      <Footer className="full-width" />
    </>
  );
}

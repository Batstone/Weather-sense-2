"use client";

import { useRef, useState } from "react";
import Button from "./Button";
import Forecast from "./Forecast";
import { WeatherData } from "@/types/weather";

import styles from "@/app/styles/Form.module.css";

export default function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const city = inputRef.current?.value;

    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    try {
      const res = await fetch(`/api/weather?city=${city}`);

      if (!res.ok) {
        throw new Error("Network response from component was not ok");
      }
      const data: WeatherData = await res.json();
      console.log("data here", data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.form__fieldset}>
          <legend className={styles.form__legend}>Search for the weather information for your city</legend>
          <div className={styles.form_input_container}>
            <div className={styles.form__error}>{error && <p aria-live="polite">{error}</p>}</div>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" ref={inputRef} />
          </div>
          <Button type="submit">Search</Button>
        </fieldset>
      </form>
      {weatherData && <Forecast />}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import Button from "./Button";
import Forecast from "./Forecast";
import { WeatherData } from "@/app/types/weather";

import styles from "@/app/styles/Form.module.css";
import CurrentForecast from "./CurrentForecast";

export default function Form({ handleData }: { handleData: (weatherData: WeatherData) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setResponseError(null);

    const city = inputRef.current?.value;

    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    if (inputRef.current) {
      setCity(city);
      inputRef.current.value = "";
      setError("");
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/weather?city=${city}`);

      if (!res.ok) {
        throw new Error("Network response from component was not ok");
      }
      const data: WeatherData = await res.json();
      if (!data) {
        throw new Error("No data found");
      }
      handleData(data);
    } catch (error) {
      setResponseError("No results found, please try searching again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit} aria-label="Search to find the weather information for your city">
        <fieldset className={styles.form__fieldset}>
          <legend className={styles.form__legend}>Search the weather information for your city</legend>
          <div className={styles.form_input_container}>
            <div className={styles.form__error}>{error && <p aria-live="polite">{error}</p>}</div>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" ref={inputRef} />
          </div>
          <Button type="submit">Search</Button>
        </fieldset>
      </form>
      {responseError && <p>{responseError}</p>}
    </div>
  );
}

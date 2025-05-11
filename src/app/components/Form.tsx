"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { WeatherData } from "@/app/types/weather";
import {
  LOCATION,
  NETWORK_ERROR_MESSAGE,
  FORM_USER_ERROR_MESSAGE,
  NO_DATA_ERROR_MESSAGE,
  WEATHER_API_URL,
  FORM_LABEL,
  FORM_ARIA_LABEL,
  LOADING_MESSAGE
} from "@/app/constants/contsants";

import styles from "@/app/styles/Form.module.css";

export default function Form({ handleData }: { handleData: (weatherData: WeatherData) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);

  function saveToLocalStorage(location: string) {
    if (location) {
      localStorage.setItem(LOCATION, location);
    }
  }

  async function fetchWeatherData(location: string) {

    setResponseError(null);
    setLoading(true);
  
    try {
      const res = await fetch(WEATHER_API_URL(location));

      if (!res.ok) {
        throw new Error(NETWORK_ERROR_MESSAGE);
      }
      const data: WeatherData = await res.json();
          console.log('data', data);
    console.log('HERE')
      if (!data) {
        throw new Error(NO_DATA_ERROR_MESSAGE);
      }
      handleData(data);
    } catch {
      setResponseError(NO_DATA_ERROR_MESSAGE);
    } finally {
      setLoading(false);
      saveToLocalStorage(location)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const location = inputRef.current?.value;

    if (!location) {
      setError(FORM_USER_ERROR_MESSAGE);
      return;
    }

    setError(null);  

    if (inputRef.current) {
      fetchWeatherData(inputRef.current.value);
      inputRef.current.value = "";
    }
  }

  useEffect(() => {
    const location = localStorage.getItem(LOCATION);
    if (location) {
      fetchWeatherData(location);
    }
  }, []);


  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit} aria-label={FORM_ARIA_LABEL}>
        <fieldset className={styles.form__fieldset}>
          <legend className={styles.form__legend}>{FORM_LABEL}</legend>
          <div className={styles.form_input_container}>
            <div className={styles.form__error} aria-live="polite">{error && <p>{error}</p>}</div>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" ref={inputRef} />
          </div>
          <Button type="submit">Search</Button>
        </fieldset>
      </form>
      <div className={styles.form__live} aria-live="polite">
        {loading && <span>{LOADING_MESSAGE}</span>}
        {responseError && <span>{responseError}</span>}
      </div>
    </div>
  );
}

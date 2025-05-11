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
    const storedLocation = localStorage.getItem(LOCATION);
    if (storedLocation) {
      inputRef.current!.value = storedLocation;
      fetchWeatherData(storedLocation);
    } 
  }, [fetchWeatherData]);


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
      <p aria-live="polite">
        {responseError && <span>{responseError}</span>}
      </p>
      {loading && <p>{loading && <span aria-live="polite">Loading...</span>}</p>}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { WeatherData } from "@/app/types/weather";
import {
  CITY,
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

  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setResponseError(null);

    const city = inputRef.current?.value;

    if (!city) {
      setError(FORM_USER_ERROR_MESSAGE);
      return;
    }

    if (inputRef.current) {
      setCity(city);
      inputRef.current.value = "";
      setError("");
    }

    setLoading(true);

    try {
      const res = await fetch(WEATHER_API_URL(city));

      if (!res.ok) {
        throw new Error(NETWORK_ERROR_MESSAGE);
      }
      const data: WeatherData = await res.json();
      if (!data) {
        throw new Error(NO_DATA_ERROR_MESSAGE);
      }
      handleData(data);
    } catch (error) {
      setResponseError(NO_DATA_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  }

  function saveToLocalStorage() {
    if (city) {
      localStorage.setItem(CITY, city);
    }
  }

  useEffect(() => {
    const storedCity = localStorage.getItem(CITY);
    if (storedCity) {
      inputRef.current!.value = storedCity;
      setCity(storedCity);
    }
  }, []);

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit} aria-label={FORM_ARIA_LABEL}>
        <fieldset className={styles.form__fieldset}>
          <legend className={styles.form__legend}>{FORM_LABEL}</legend>
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

"use client";

import { useRef, useState } from "react";
import Button from "./Button";
import Forecast from "./Forecast";
import { WeatherData } from "@/types/weather";

export default function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [weatherData, setWeatherData] = useState(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const city = inputRef.current?.value;

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    const res = await fetch(`/api/weather?city=${city}`);
    const data: WeatherData = await res.json();
    console.log("data here", data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Search for the weather information for your city</legend>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" ref={inputRef} />
          <Button type="submit">Search</Button>
        </fieldset>
      </form>
      {weatherData && <Forecast />}
    </div>
  );
}

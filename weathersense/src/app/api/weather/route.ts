import { NextResponse } from "next/server";

import { WeatherData } from "@/app/types/weather"; // Import the interface

export async function GET(request: Request) {
  const apiKey = process.env.WEATHER_API_KEY;

  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data: WeatherData = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return new Response("Failed to fetch weather data", { status: 500 });
  }
}

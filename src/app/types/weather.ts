import { DAYS_OF_WEEK } from "../constants/contsants";

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];
export type TempUnit = "c" | "f";

export interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    wind_kph: number;
    wind_dir: string;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        maxtemp_f: number;
        mintemp_f: number;

        condition: {
          text: string;
          icon: string;
        };
        totalprecip_mm: number;
        daily_chance_of_rain: number;
      };
    }[];
  };
}

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
      };
    }[];
  };
}

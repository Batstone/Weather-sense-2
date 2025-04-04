export const CELCIUS = "c";
export const FAHRENHEIT = "f";
export const CITY = "city";

export const LOADING_MESSAGE = "Checking the weather...";

export const FORM_USER_ERROR_MESSAGE = "Please enter a city name.";
export const NETWORK_ERROR_MESSAGE = "Network response from component was not ok.";
export const NO_DATA_ERROR_MESSAGE = "No results found, please try searching again.";

export const WEATHER_API_URL = (city: string) => `/api/weather?city=${city}`;
export const FORM_ARIA_LABEL = "Search to find the weather information for your city";
export const FORM_LABEL = "Search the weather information for your city";

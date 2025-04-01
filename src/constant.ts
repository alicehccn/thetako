import { format, subDays } from "date-fns";

export const APOD_HOMEPAGE = "https://apod.nasa.gov/apod/astropix.html";

export const EPIC_HOMEPAGE = "https://epic.gsfc.nasa.gov/";

export const formatDate = (date: Date | string) =>
  format(new Date(date), "MMMM dd, yyyy");

export const formatDateTime = (date: Date | string) =>
  format(new Date(date), "MMMM dd, yyyy, h:mmaaa");

export const formatApiDate = (days: number) =>
  format(subDays(new Date(), days), "yyyy-MM-dd");

export const fetchApodApi = (days: number) =>
  `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_OPEN_API}&start_date=${formatApiDate(days)}`;

export const fetchWeatherApi = () => `https://api.weather.gov/alerts/active`;

export const fetchEpicApi = (date: string, color: string) =>
  `https://epic.gsfc.nasa.gov/api/${color}?date=${date}`;

export const composeEpicImageUrl = (
  filename: string,
  date: Date | string,
  color: string,
) =>
  `https://epic.gsfc.nasa.gov/archive/${color}/${format(date, "yyyy/MM/dd")}/png/${filename}.png`;

export const onThisDayUrl = (date: Date | string) =>
  `https://en.wikipedia.org/api/rest_v1/feed/onthisday/selected/${format(date, "yyyy/MM/dd")}`;

export const MENU_OPTIONS = [
  "DEMO",
  "APOD (Astronomy Picture of the Day)",
  "EPIC (Earth Polychromatic Imaging Camera)",
  "NOAA (National Oceanic and Atmospheric Administration)",
];

export const EPIC_INTERVAL = 3600;

export enum EPIC_COLOR {
  NATURAL = "natural",
  ENHANCED = "enhanced",
  CLOUD = "cloud",
  AEROSOL = "aerosol",
}

export const EPIC_TAB = [
  { label: "Natural", value: EPIC_COLOR.NATURAL },
  { label: "Enhanced", value: EPIC_COLOR.ENHANCED },
  { label: "Aresol", value: EPIC_COLOR.AEROSOL },
  { label: "Cloud", value: EPIC_COLOR.CLOUD },
];

export const TAB_PROPS = (index: number) => {
  return {
    id: EPIC_TAB[index].value,
    "aria-controls": EPIC_TAB[index].value,
    value: EPIC_TAB[index].value,
    label: EPIC_TAB[index].label,
  };
};

import { format, subDays } from "date-fns";

export const APOD_HOMEPAGE = "https://apod.nasa.gov/apod/astropix.html";

export const getDateString = (date: Date | string) =>
  format(new Date(date), "MMMM dd, yyyy");

export const getDateTimeString = (date: Date | string) =>
  format(new Date(date), "MMMM dd, yyyy, h:mmaaa");

export const getApodDate = (days: number) =>
  format(subDays(new Date(), days), "yyyy-MM-dd");

export const fetchApodApi = (days: number) =>
  `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_OPEN_API}&start_date=${getApodDate(days)}`;

export const fetchWeatherApi = () => `https://api.weather.gov/alerts/active`;

export const fetchEpicApi = (date: string) =>
  `https://epic.gsfc.nasa.gov/api/natural?date=${date}`;

export const composeEpicImageUrl = (filename: string, date: Date | string) =>
  `https://epic.gsfc.nasa.gov/archive/natural/${format(date, "yyyy/MM/dd")}/png/${filename}.png`;

export const MENU_OPTIONS = [
  "DEMO",
  "APOD (Astronomy Picture of the Day)",
  "NOAA (National Oceanic and Atmospheric Administration)",
  "EPIC (Earth Polychromatic Imaging Camera)",
];

export const MODAL_STYLES = {
  content: {
    width: "46%",
    maxHeight: "96%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const EPIC_INTERVAL = 3600;

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

export const SKILL_MAP = [
  {
    subject: "Stack",
    items: [
      "Typescript",
      "ReactJS",
      "XHR",
      "HTML / CSS",
      "Golang",
      "Python",
      "SQL",
    ],
  },
  {
    subject: "Expertise",
    items: ["e-Commerce", "Map / Geocode", "Testing", "EHR", "Data Viz"],
  },
  {
    subject: "Paradigm",
    items: ["Cloud Computing", "Container", "CI/CD", "APM", "Agile"],
  },
];

export const MENU_OPTIONS = [
  "DEMO",
  "APOD (Astronomy Picture of the Day)",
  "NOAA (National Oceanic and Atmospheric Administration)",
  "EPIC",
];

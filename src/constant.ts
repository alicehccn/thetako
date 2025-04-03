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

export const MENU_OPTIONS = [
  "DEMO",
  "APOD (Astronomy Picture of the Day)",
  "EPIC (Earth Polychromatic Imaging Camera)",
  "NOAA (National Oceanic & Atmostphere Adminstration)",
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

export const SKILL_MAP = [
  {
    subject: "Core",
    items: [{ label: "Software Development", value: 100 }],
  },
  {
    subject: "Language",
    items: [
      { label: "Typescript", value: 100 },
      { label: "NodeJS", value: 100 },
      { label: "HTML/CSS", value: 100 },
      { label: "Go", value: 40 },
      { label: "Python", value: 60 },
      { label: "Protobuf", value: 60 },
      { label: "Rust", value: 30 },
    ],
  },
  {
    subject: "Framework",
    items: [
      { label: "React", value: 80 },
      { label: "Next", value: 80 },
      { label: "NestJS", value: 80 },
      { label: "Express", value: 40 },
      { label: "Django", value: 40 },
      { label: "Expo", value: 40 },
      { label: "SQL", value: 80 },
      { label: "NoSQL", value: 60 },
      { label: "Jest", value: 60 },
      { label: "Babel", value: 60 },
    ],
  },
  {
    subject: "Tool",
    items: [
      { label: "AWS", value: 100 },
      { label: "Docker", value: 100 },
      { label: "Vercel", value: 80 },
      { label: "Heroku", value: 80 },
      { label: "Github", value: 100 },
      { label: "CircleCI", value: 80 },
      { label: "Datadog", value: 80 },
      { label: "Mapbox", value: 80 },
      { label: "Google Maps", value: 80 },
      { label: "AdvancedMD", value: 80 },
      { label: "Healthie", value: 80 },
      { label: "D3.js", value: 60 },
    ],
  },
];

export const PIE_CHART = [
  "#C4C4C4",
  "#E0E0E0",
  "#C6C0B9",
  "#878787",
  "#555555",
  "#3D3D3D",
  "#666666",
  "#929292",
  "#6e6e6e",
];

import { format, subDays } from "date-fns";
import { Layer } from "mapbox-gl";

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
  "NOAA (National Oceanic & Atmosphere Adminstration)",
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
    subject: "Frontend",
    items: [
      { label: "Typescript", value: 100 },
      { label: "HTML/CSS", value: 20 },
      { label: "React", value: 100 },
      { label: "XHR", value: 80 },
      { label: "gRPC", value: 40 },
      { label: "Expo", value: 60 },
      { label: "D3.js", value: 30 },
      { label: "Jest", value: 60 },
    ],
  },
  {
    subject: "Backend",
    items: [
      { label: "NodeJS", value: 100 },
      { label: "SQL/NoSQL", value: 80 },
      { label: "Python", value: 60 },
      { label: "Golang", value: 40 },
      { label: "Rust", value: 30 },
      { label: "Protobuf", value: 60 },
      { label: "Express", value: 100 },
    ],
  },
  {
    subject: "Tool",
    items: [
      { label: "AWS", value: 100 },
      { label: "Docker", value: 100 },
      { label: "Heroku", value: 80 },
      { label: "Vercel", value: 60 },
      { label: "Github", value: 100 },
      { label: "CircleCI", value: 40 },
      { label: "Appetize", value: 60 },
      { label: "Mapbox", value: 80 },
      { label: "Datadog", value: 60 },
    ],
  },
];

export const PIE_CHART = [
  "#C6C0B9",
  "#D3D3D3",
  "#C4C4C4",
  "#929292",
  "#878787",
  "#6e6e6e",
  "#666666",
];

export const MAIN_LAYER = (source: string): Layer => {
  return {
    id: "alerts-heat",
    type: "heatmap",
    source,
    maxzoom: 9,
    paint: {
      // Increase the heatmap weight based on frequency and property magnitude
      "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
      // Increase the heatmap color weight weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(33,102,172,0)",
        0.2,
        "rgb(103,169,207)",
        0.4,
        "rgb(209,229,240)",
        0.6,
        "rgb(253,219,199)",
        0.8,
        "rgb(239,138,98)",
        1,
        "rgb(178,24,43)",
      ],
      // Adjust the heatmap radius by zoom level
      "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
      // Transition from heatmap to circle layer by zoom level
      "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
    },
  };
};

export const CIRCLE_LAYER = (color: string): Layer => {
  return {
    id: "clusters",
    type: "circle",
    source: "alert-group",
    paint: {
      "circle-color": color,
      "circle-radius": 6,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  };
};

export const WeatherEmoji = (label: string) => {
  const table: { [key: string]: string } = {
    "Severe Thunderstorm Warning": "⚡️",
    "Flood Warning": "🌊",
    "Flood Advisory": "🌊",
    "Fire Weather Watch": "🔥",
    "Special Weather Statement": "☔️",
    "Special Marine Warning": "⚓️",
    "Blizzard Warning": "🌨️",
    "High Wind Warning": "💨",
    "Wind Advisory": "💨",
    "Small Craft Advisory": "⚓️",
    "Low Water Advisory": "🌵",
    "Gale Warning": "🌀",
    "Storm Warning": "⛈️",
    "Lake Wind Advisory": "💨",
    "Brisk Wind Advisory": "💨",
    "Winter Weather Advisory": "☃️",
    "Freeze Watch": "🥶",
    "Hazardous Seas Warning": "🌊",
    "Winter Storm Watch": "🌨️",
    "Red Flag Warning": "🚩",
    "High Wind Watch": "💨",
    "Winter Storm Warning": "🌨️",
    "Lakeshore Flood Advisory": "🌊",
    "Air Quality Alert": "😶‍🌫️",
    "Frost Advisory": "🥶",
    "Flood Watch": "🌊",
    "Rip Current Statement": "🌊",
  };
  return table[label];
};

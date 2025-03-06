import { format, subDays } from "date-fns";

export const APOD_HOMEPAGE = "https://apod.nasa.gov/apod/astropix.html";

export const getDateString = (date: Date | string) =>
  format(new Date(date), "MMMM dd, yyyy");

export const getDateTimeString = (date: Date | string) =>
  format(new Date(date), "MMMM dd, yyyy, h:mmaaa");

export const getApodStartDate = (days: number) =>
  format(subDays(new Date(), days), "yyyy-MM-dd");

export const fetchApodApi = (days: number) =>
  `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_OPEN_API}&start_date=${getApodStartDate(days)}`;
export const fetchEonetApi = (days: number) =>
  `https://eonet.gsfc.nasa.gov/api/v2.1/categories/8?days=${days}&status=open`;

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

export const buttonOptions = [
  "DEMO",
  "APOD (Astronomy Picture of the Day)",
  "EONET (Earth Observatory Natural Event Tracker)",
];

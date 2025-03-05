import { format, subDays } from "date-fns";

export const APOD_HOMEPAGE = "https://apod.nasa.gov/apod/astropix.html";

export const FETCH_EVENT_LIMIT = 20;
export const FETCH_EVENT_URL = `https://eonet.gsfc.nasa.gov/api/v2.1/categories/8?days=${14}&status=open`;

export const getDateString = (date: Date | string) =>
  format(new Date(date), "yyyy-MM-dd");

export const getApodStartDate = (days: number) =>
  format(subDays(new Date(), days), "yyyy-MM-dd");

export const fetchApodApi = (days: number) =>
  `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_OPEN_API}&start_date=${getApodStartDate(days)}`;

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
    subject: "Application",
    items: [
      "Billing API",
      "Payment API",
      "Map API",
      "A/B Testing",
      "Analytics",
      "Access Control",
      "HIPAA",
    ],
  },
  {
    subject: "DevOps",
    items: ["Cloud", "Container", "Git", "Data Storage", "APM", "CI/CD"],
  },
];

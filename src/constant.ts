import { format, subDays } from "date-fns";

export const APOD_HOMEPAGE = "https://apod.nasa.gov/apod/astropix.html";

export const FETCH_EVENT_LIMIT = 10;
export const FETCH_EVENT_URL = `https://eonet.gsfc.nasa.gov/api/v2.1/events?limit=${FETCH_EVENT_LIMIT}&status=open`;

export const getDateString = (date: Date | string) =>
  new Date(date).toDateString();

export const getApodStartDate = () =>
  format(subDays(new Date(), 7), "yyyy-MM-dd");

export const fetchApodApi = (startDate: string) =>
  `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_OPEN_API}&start_date=${startDate}`;

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

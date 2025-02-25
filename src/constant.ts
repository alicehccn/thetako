import { format, subDays } from "date-fns";

export const APOD_HOMEPAGE = "https://apod.nasa.gov/apod/astropix.html";

export const FETCH_EVENT_LIMIT = 10;
export const FETCH_EVENT_URL = `https://eonet.gsfc.nasa.gov/api/v2.1/events?limit=${FETCH_EVENT_LIMIT}&status=open`;
export const MODAL_STYLES = {
  content: {
    maxWidth: "700px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const getApodStartDate = () =>
  format(subDays(new Date(), 7), "yyyy-MM-dd");

export const formatDate = (date: Date | string) =>
  format(date, "MMMM dd, yyyy");

export const fetchApodApi = (startDate: string) =>
  `https://api.nasa.gov/planetary/apod?api_key=ibUVEf1jTwiXdSMK0eTmaUCKi9LAIdsTAkLeiRO4&start_date=${startDate}`;

export const SKILL_MAP = [
  {
    subject: "Basics",
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
    items: [
      "AWS",
      "Docker",
      "Github",
      "Heroku",
      "Vercel",
      "Datadog",
      "CircleCI",
    ],
  },
];

import { LngLatLike } from "mapbox-gl";

export type Event = {
  id: string;
  title: string;
  description: string;
  link: string;
  categories: {
    id: string;
    title: string;
  }[];
  sources: {
    id: string;
    url: string;
  }[];
  geometries: {
    date: string;
    type: string;
    coordinates: LngLatLike;
  }[];
};

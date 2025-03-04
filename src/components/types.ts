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
  geometries: Geometry[];
};

export type Geometry = {
  date: string;
  type: string;
  coordinates: LngLatLike;
};

export type AssetResponse = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
};

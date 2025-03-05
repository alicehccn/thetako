import { useEffect, useRef } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Event } from "./types";
import _ from "lodash";
import { FeatureCollection } from "geojson";

type MapProps = {
  data: Event[];
};

function createGeoJson(events: Event[]) {
  const wildfires: FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };
  for (const event of events) {
    const positions: LngLatLike[] = event.geometries.map((g) => g.coordinates);
    const points = positions.map((p) => {
      return p
        .toString()
        .split(",")
        .map((l) => parseFloat(l));
    });
    wildfires.features.push({
      type: "Feature",
      geometry: {
        type: "MultiPoint",
        coordinates: points,
      },
      properties: {
        ...event,
      },
    });
  }
  return wildfires;
}

const Mapbox: React.FC<MapProps> = ({ data }) => {
  const mapContainerRef = useRef<any>();
  const mapRef = useRef<any>();

  useEffect(() => {
    if (!data) {
      return;
    }
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-99.04, 38.907],
      zoom: 3.8,
    });
    mapRef.current.on("load", () => {
      const currentSource = mapRef.current.getSource("wildfires");
      const currentLayer = mapRef.current.getLayer("wildfires-viz");
      !currentSource &&
        mapRef.current.addSource("wildfires", {
          type: "geojson",
          data: createGeoJson(data),
          generateId: true,
        });
      !currentLayer &&
        mapRef.current.addLayer({
          id: "wildfires-viz",
          type: "heatmap",
          source: "wildfires",
          paint: {
            "heatmap-intensity": 1,
            "heatmap-opacity": 0.9,
          },
        });
    });
  }, data);

  return <div id="map" ref={mapContainerRef} className="map-container" />;
};

export default Mapbox;

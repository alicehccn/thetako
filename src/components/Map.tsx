import { useEffect, useRef } from "react";
import mapboxgl, { LngLatLike, Map } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { Event, Geometry } from "./types";
import _ from "lodash";
type MapProps = {
  data: Geometry[][];
};
const Mapbox: React.FC<MapProps> = ({ data }) => {
  const mapContainerRef = useRef<any>();
  const mapRef = useRef<any>();

  useEffect(() => {
    if (!data) {
      return;
    }
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxpY2VoY2NuIiwiYSI6ImNtN2pwc2F0aTBhNHEyaXB6NnltazYyc20ifQ.yI5xs8bW3CqzHk0AhPiL5Q";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [-100.04, 36.907],
      zoom: 3.5,
    });
    _.flatten(data).map((geometry: Geometry) => {
      new mapboxgl.Marker({ color: "red" })
        .setLngLat(geometry.coordinates)
        .addTo(mapRef.current);
    });
  }, [data]);

  return <div id="map" ref={mapContainerRef} className="map-container" />;
};

export default Mapbox;

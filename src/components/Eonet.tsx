import React from "react";
import ReactModal from "react-modal";
import { fetchEonetApi } from "../constant";
import { Event } from "./types";
import _ from "lodash";
import Switch from "@mui/material/Switch";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useEffect, useRef } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FeatureCollection } from "geojson";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const MODAL_STYLES = {
  content: {
    width: "900px",
    maxWidth: "100%",
    maxHeight: "95vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const EONET: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [events, setEvents] = React.useState<Event[]>();
  const [darkMode, setDarkMode] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (!events) {
      fetch(fetchEonetApi(14))
        .then((response) => response?.json())
        .then((json) => setEvents(json.events))
        .catch((error) => console.error(error));
    }
  });
  if (!events) {
    return;
  }
  const label = { inputProps: { "aria-label": "Dark Mode" } };
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={MODAL_STYLES}
      contentLabel="EONET Modal"
      ariaHideApp={false}
    >
      <div className="eonet">
        <h2>Wildfires in the United States</h2>
        <Switch
          {...label}
          checkedIcon={<Brightness4Icon />}
          defaultChecked
          onChange={() => {
            setDarkMode(!darkMode);
          }}
        />
        <small>
          Source:{" "}
          <a target="_blank" href="https://eonet.gsfc.nasa.gov/what-is-eonet">
            Earth Observatory, NASA
          </a>
        </small>
        <Mapbox data={events} darkMode={darkMode} />
      </div>
    </ReactModal>
  );
};

type MapProps = {
  data: Event[];
  darkMode: boolean;
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

const Mapbox: React.FC<MapProps> = ({ data, darkMode }) => {
  const mapContainerRef = useRef<any>();
  const mapRef = useRef<any>();

  useEffect(() => {
    if (!data) {
      return;
    }
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${darkMode ? "dark" : "light"}-v11`,
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
  }, [data, darkMode]);

  return <div id="map" ref={mapContainerRef} className="map-container" />;
};

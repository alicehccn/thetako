import React, { useState, useEffect, useRef } from "react";
import ReactModal from "react-modal";
import { fetchWeatherApi, formatDateTime } from "../constant";
import Switch from "@mui/material/Switch";
import ReplayIcon from "@mui/icons-material/Replay";
import mapboxgl, { Point } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GeoJSON } from "geojson";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/Contrast";

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

export const Weather: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [alerts, setAlerts] = useState<any>();
  const [reloading, setReload] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  useEffect(() => {
    if (!alerts || !!reloading) {
      fetch(fetchWeatherApi())
        .then((response) => response?.json())
        .then((json) => setAlerts(json))
        .catch((error) => console.error(error));
    }
    setReload(false);
  }, [alerts, reloading]);
  if (!alerts) {
    return;
  }
  const label = { inputProps: { "aria-label": "Dark Mode" } };
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={MODAL_STYLES}
      contentLabel="Weather Modal"
      ariaHideApp={false}
    >
      <div className="weather">
        <h2>National Weather Alerts</h2>
        <h4>
          <Switch
            {...label}
            checkedIcon={<DarkModeIcon />}
            onChange={() => {
              setDarkMode(!darkMode);
            }}
          />
          Last updated: {formatDateTime(alerts.updated)}
          <IconButton
            aria-label="Refresh"
            disabled={reloading}
            onClick={() => setReload(true)}
          >
            <ReplayIcon />
          </IconButton>
        </h4>

        <Mapbox data={alerts} darkMode={darkMode} />
        <small>
          <a target="_blank" href="https://api.weather.gov/openapi.json">
            &copy; weather.gov
          </a>
        </small>
      </div>
    </ReactModal>
  );
};

type MapProps = {
  data: GeoJSON;
  darkMode: boolean;
};

const Mapbox: React.FC<MapProps> = ({ data, darkMode }) => {
  const mapContainerRef = useRef<any>();
  const mapRef = useRef<any>();
  const [selectedFeature, setSelectedFeature] = useState<any>();
  const [point, setPoint] = useState<Point>();

  // Refs to track the latest state values
  const selectedFeatureRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const map = (mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-99.04, 38.907],
      zoom: 3.8,
      style: `mapbox://styles/mapbox/${darkMode ? "dark" : "light"}-v11`,
      config: {
        basemap: {
          colorPlaceLabelHighlight: "red",
          colorPlaceLabelSelect: "blue",
        },
      },
    }));

    map.on("load", () => {
      map.addSource("alerts", {
        type: "geojson",
        data,
      });

      map.addLayer(
        {
          id: "alerts-heat",
          type: "heatmap",
          source: "alerts",
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              0,
              0,
              6,
              1,
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              9,
              3,
            ],
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
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              9,
              20,
            ],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              1,
              9,
              0,
            ],
          },
        },
        "waterway-label",
      );

      map.addLayer(
        {
          id: "alerts-point",
          type: "circle",
          source: "alerts",
          minzoom: 7,
          paint: {
            // Size circle radius by alert magnitude and zoom level
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              ["interpolate", ["linear"], ["get", "mag"], 1, 1, 6, 4],
              16,
              ["interpolate", ["linear"], ["get", "mag"], 1, 5, 6, 50],
            ],
            // Color circle by alert magnitude
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              1,
              "rgba(33,102,172,0)",
              2,
              "rgb(103,169,207)",
              3,
              "rgb(209,229,240)",
              4,
              "rgb(253,219,199)",
              5,
              "rgb(239,138,98)",
              6,
              "rgb(178,24,43)",
            ],
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
            // Transition from heatmap to circle layer by zoom level
            "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
          },
        },
        "waterway-label",
      );
      map.on("click", "alerts-heat", (e: any) => {
        setSelectedFeature(e.features[0]);
        setPoint(e.point);
        map.setCenter(e.lngLat);
        map.setZoom(6);
      });
    });
    return () => map.remove();
  }, [data, darkMode]);

  return (
    <>
      <div id="map" ref={mapContainerRef} className="map-container" />
      {selectedFeature?.properties && (
        <div className="map-overlay">
          <div className="close-btn">
            <Button
              onClick={() => {
                setSelectedFeature(null);
                mapRef.current.setCenter([-99.04, 38.907]);
                mapRef.current.setZoom(3.8);
              }}
              endIcon={<CloseIcon />}
            />
          </div>
          <div
            className={`map-overlay-inner ${selectedFeature.properties.severity}`}
          >
            <h3>{selectedFeature.properties.event}</h3>
            <p>
              <b>Affected area:</b>{" "}
              {selectedFeature.properties.areaDesc
                .split("; ")
                .map((area: string) => (
                  <div>{area}</div>
                ))}
            </p>
            <p>{selectedFeature.properties.headline}.</p>
          </div>
        </div>
      )}
    </>
  );
};
